import Immutable from 'immutable';

import actionTypes from '../constants/upcImporterConstants';
import _ from 'lodash';

export const $$initialState = Immutable.fromJS({
  stageIndex: 0,
  tabValue: 'a',
  inputString: null,
  inputError: null,
  splitStringArray: [],
  errorBank: {},
  deletedKeys: [],
  editDialog: {
    isOpened: false,
    originalEntry: null,
    entryIndex: null,
    entryValue: null,
    entryError: null,
    errorMessages: [],
  },
  submission: {
    isLoading: false,
    data: {},
    error: {}
  }
});

export default function upcImporterReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.INPUT_STRING_UPDATE:
      return $$state.set('inputString', data.inputString);

    case actionTypes.INPUT_ERROR_UPDATE:
      return $$state.set('inputError', data.errorString);

    case actionTypes.STAGE_INDEX_UPDATE:
      return $$state.set('stageIndex', data.newStageIndex);

    case actionTypes.SPLIT_STRING_ARRAY_UPDATE:
      return $$state.set('splitStringArray', data.separatedArray);

    case actionTypes.DELETE_KEY_ADD:
      return $$state.update('deletedKeys', value => _.uniq(value.concat([data.index])));

    case actionTypes.DELETE_KEY_REMOVE:
      return $$state.update('deletedKeys', value => _.difference(value,[value[data.index]]));

    case actionTypes.SPLIT_STRING_ARRAY_ENTRY_UPDATE:
      return $$state.updateIn(['splitStringArray', `${data.entryIndex}`], value => data.entryValue);

    case actionTypes.ERROR_BANK_UPDATE:
      return $$state.set('errorBank', data.errorBank);

    case actionTypes.ERROR_BANK_ENTRY_REMOVE:
      return $$state.update('errorBank', value => value.remove(`${data.entryIndex}`));

    case actionTypes.EDIT_DIALOG_UPDATE:
      var newState = $$state.toJS();
      newState.editDialog.isOpened = data.isOpened;
      newState.editDialog.entryIndex = data.entryIndex;

      if(_.isNil(newState.editDialog.entryIndex)) {
        newState.editDialog.originalEntry = null;
        newState.editDialog.entryValue = null;
        newState.editDialog.errorMessages = [];
      } else {
        newState.editDialog.originalEntry = newState.splitStringArray[newState.editDialog.entryIndex];
        newState.editDialog.entryValue = newState.splitStringArray[newState.editDialog.entryIndex];
        newState.editDialog.errorMessages = newState.errorBank[newState.editDialog.entryIndex] || [];
      }

      return Immutable.fromJS(newState)

    case actionTypes.EDIT_DIALOG_ENTRY_VALUE_UPDATE:
      return $$state.updateIn(['editDialog', 'entryValue'], value => data.entryValue);

    case actionTypes.EDIT_DIALOG_ENTRY_ERROR_UPDATE:
      return $$state.updateIn(['editDialog', 'entryError'], value => data.entryError);

    case actionTypes.EDIT_DIALOG_ERROR_MESSAGES_UPDATE:
      return $$state.updateIn(['editDialog', 'errorMessages'], value => data.errorMessages);

    case actionTypes.TAB_VALUE_UPDATE:
      return $$state.set('tabValue', data.tabValue);

    case actionTypes.QURI_UPLOAD_REQUEST:
      return $$state.updateIn(['submission', 'isLoading'], value => true);

    case actionTypes.QURI_UPLOAD_RECEIVE:
      return $$state.updateIn(['submission', 'isLoading'], value => false);

    case actionTypes.QURI_UPLOAD_DATA_LOG:
      return $$state.updateIn(['submission', 'data'], value => data.data);

    case actionTypes.QURI_UPLOAD_ERROR_LOG:
      return $$state.updateIn(['submission', 'error'], value => data.error);

    default:
      return $$state;
  }
}

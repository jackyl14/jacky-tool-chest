import Immutable from 'immutable';

import actionTypes from '../constants/tripListerConstants';
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

export default function tripListerReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.INPUT_STRING_UPDATE:
      return $$state.set('inputString', data.inputString);

    default:
      return $$state;
  }
}

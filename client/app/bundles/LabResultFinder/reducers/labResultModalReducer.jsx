import Immutable from 'immutable';

import actionTypes from '../constants/labResultFinderConstants';
import _ from 'lodash';

export const $$initialState = Immutable.fromJS({
  uploadModal: {
    fileName: "",
    isOpened: false,
    isUploading: false,
  },
});

export default function labResultModalReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.MODAL_IS_OPENED_UPDATE:
      return $$state.setIn(['uploadModal', 'isOpened'], data.isOpened);

    case actionTypes.MODAL_IS_UPLOADING_UPDATE:
      return $$state.setIn(['uploadModal', 'isUploading'], data.isUploading);

    case actionTypes.MODAL_FILE_NAME_UPDATE:
      return $$state.setIn(['uploadModal', 'fileName'], data.fileName);

    default:
      return $$state;
  }
}

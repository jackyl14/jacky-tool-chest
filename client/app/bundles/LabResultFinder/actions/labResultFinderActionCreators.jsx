import fetch from 'isomorphic-fetch';
import actionTypes from '../constants/labResultFinderConstants';
import _ from 'lodash';

export function updateLabResultArray(data) {
  return {
    type: actionTypes.LAB_RESULT_ARRAY_UPDATE,
    data,
  };
}

export function initiateLabResultSearch(data) {
  return (dispatch, getState) => {
    if(!getState().$$labResultInputStore.getIn(['finderInput', 'isSearching'])) {
      dispatch(updateFinderInputIsSearching({isSearching: true}));
      dispatch(findLabResult(data));
      dispatch(updateFinderInputIsSearching({isSearching: false}));
    }
  };
}

function findLabResult(data) {
  return {
    type: actionTypes.LAB_RESULT_ARRAY_FIND,
    data,
  };
}

export function updateFinderInputId(data) {
  return {
    type: actionTypes.FINDER_INPUT_ID_UPDATE,
    data
  };
}

export function updateFinderInputError(data) {
  return {
    type: actionTypes.FINDER_INPUT_ERROR_UPDATE,
    data
  };
}

function updateFinderInputIsSearching(data) {
  return {
    type: actionTypes.FINDER_INPUT_IS_SEARCHING_UPDATE,
    data
  };
}

export function updateModalIsOpened(data) {
  return {
    type: actionTypes.MODAL_IS_OPENED_UPDATE,
    data
  };
}


function updateModalIsUploading(data) {
  return {
    type: actionTypes.MODAL_IS_UPLOADING_UPDATE,
    data
  };
}

export function updateModalFileName(data) {
  return {
    type: actionTypes.MODAL_FILE_NAME_UPDATE,
    data
  }
}

export function initiateUploadProcess(data) {
  return (dispatch, getState) => {
    if(!getState().$$labResultModalStore.getIn(['uploadModal', 'isUploading'])) {
      dispatch(updateModalIsUploading({isUploading: true}));
      dispatch(updateLabResultArray(data));
      dispatch(updateModalIsOpened({isOpened: false}));
      dispatch(updateModalFileName({fileName: ""}));
      dispatch(updateModalIsUploading({isUploading: false}));
    }
  };
}

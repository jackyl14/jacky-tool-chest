import fetch from 'isomorphic-fetch';
import actionTypes from '../constants/upcImporterConstants';
import { checkStatus, parseJSON } from '../util/http_helpers';
import _ from 'lodash';

export function updateInputString(data) {
  return {
    type: actionTypes.INPUT_STRING_UPDATE,
    data,
  };
}

export function updateInputError(data) {
  return {
    type: actionTypes.INPUT_ERROR_UPDATE,
    data
  };
}

export function updateStageIndex(data) {
  return {
    type: actionTypes.STAGE_INDEX_UPDATE,
    data
  };
}

export function updateSplitStringArray(data) {
  return {
    type: actionTypes.SPLIT_STRING_ARRAY_UPDATE,
    data
  };
}

export function updateSplitStringArrayEntry(data) {
  return {
    type: actionTypes.SPLIT_STRING_ARRAY_ENTRY_UPDATE,
    data
  };
}

export function addDeleteKey(data) {
  return {
    type: actionTypes.DELETE_KEY_ADD,
    data
  };
}

export function removeDeleteKey(data) {
  return {
    type: actionTypes.DELETE_KEY_REMOVE,
    data
  };
}

export function updateErrorBank(data) {
  return {
    type: actionTypes.ERROR_BANK_UPDATE,
    data
  };
}

export function removeErrorBankEntry(data) {
  return {
    type: actionTypes.ERROR_BANK_ENTRY_REMOVE,
    data
  };
}

export function updateEditDialog(data) {
  return {
    type: actionTypes.EDIT_DIALOG_UPDATE,
    data
  };
}

export function updateEditDialogEntryString(data) {
  return {
    type: actionTypes.EDIT_DIALOG_ENTRY_VALUE_UPDATE,
    data,
  };
}

export function updateEditDialogEntryError(data) {
  return {
    type: actionTypes.EDIT_DIALOG_ENTRY_ERROR_UPDATE,
    data
  };
}

export function updateEditDialogErrorMessages(data) {
  return {
    type: actionTypes.EDIT_DIALOG_ERROR_MESSAGES_UPDATE,
    data
  };
}

export function updateTabValue(data) {
  return {
    type: actionTypes.TAB_VALUE_UPDATE,
    data
  };
}

export function logQuriUploadData(data) {
  return {
    type: actionTypes.QURI_UPLOAD_DATA_LOG,
    data
  };
}

export function logQuriUploadError(data) {
  return {
    type: actionTypes.QURI_UPLOAD_ERROR_LOG,
    data
  };
}

function requestQuriUpload() {
  return {
    type: actionTypes.QURI_UPLOAD_REQUEST,
  };
}

function receiveQuriUpload() {
  return {
    type: actionTypes.QURI_UPLOAD_RECEIVE,
  };
}

export function uploadToQuri(uploadArray) {
  return (dispatch, getState) => {
    var upcImporterStore = getState().$$upcImporterStore;
    var splitStringArray = upcImporterStore.get('splitStringArray');
    var deletedArray = _.at(splitStringArray, upcImporterStore.get('deletedKeys'));

    if (!upcImporterStore.getIn(['submission', 'isFetching'])) {
      dispatch(requestQuriUpload());
      return fetch(`https://iwo3uesa6c.execute-api.us-east-1.amazonaws.com/prod/products`, {
        method: 'POST',
        body: JSON.stringify({
          list: _.difference(splitStringArray, deletedArray),
        })
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        dispatch(logQuriUploadData({ data }));
        dispatch(receiveQuriUpload());
      })
      .catch(error => {
        dispatch(logQuriUploadError({ error }));
        dispatch(receiveQuriUpload());
      });
    } else {
      return Promise.resolve();
    }
  };
}

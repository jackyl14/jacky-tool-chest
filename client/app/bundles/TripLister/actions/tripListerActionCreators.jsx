import fetch from 'isomorphic-fetch';
import actionTypes from '../constants/tripListerConstants';
import { checkStatus, parseJSON } from '../util/http_helpers';
import _ from 'lodash';

export function updateInputString(data) {
  return {
    type: actionTypes.INPUT_STRING_UPDATE,
    data,
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

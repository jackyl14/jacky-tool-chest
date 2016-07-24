import fetch from 'isomorphic-fetch';
import actionTypes from '../constants/tripListerConstants';
import { checkStatus, parseJSON } from '../util/httpHelpers';

export function updateTripsArray(data) {
  return {
    type: actionTypes.TRIPS_ARRAY_UPDATE,
    data,
  };
}

function requestTripsArray() {
  return {
    type: actionTypes.TRIPS_ARRAY_REQUEST,
  };
}

function logTripsArrayRequestError(data) {
  return {
    type: actionTypes.TRIPS_ARRAY_REQUEST_ERROR_LOG,
    data,
  };
}

function receiveTripsArray() {
  return {
    type: actionTypes.TRIPS_ARRAY_RECEIVE,
  };
}

export function requestTripArray() {
  return (dispatch, getState) => {
    if (!getState().$$tripListerStore.getIn(['requests', 'tripsArray', 'isFetching'])) {
      dispatch(requestTripsArray());
      return fetch(`/api/trips/uber`, {
        method: "GET",
        headers: {
          "Authorization": getState().$$tripListerStore.get('basicAuth'),
        },
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        dispatch(updateTripsArray({tripsArray: data}));
        dispatch(receiveTripsArray());
      })
      .catch(error => {
        dispatch(logTripsArrayRequestError({error}));
        dispatch(receiveTripsArray());
      });
    } else {
      return Promise.resolve();
    }
  };
}

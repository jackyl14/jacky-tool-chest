import Immutable from 'immutable';

import actionTypes from '../constants/tripListerConstants';
import _ from 'lodash';

export const $$initialState = Immutable.fromJS({
  tripsArray: [],
  basicAuth: null,
  requests: {
    tripsArray: {
      count: 0,
      isFetching: false,
      error: null,
    },
  },
});

export default function tripListerReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.TRIPS_ARRAY_UPDATE:
      return $$state.set('tripsArray', data.tripsArray);

    case actionTypes.TRIPS_ARRAY_REQUEST:
      return $$state.setIn(['requests', 'tripsArray', 'isFetching'], true)

    case actionTypes.TRIPS_ARRAY_REQUEST_COUNT_INCREMENT:
      return $$state.updateIn(['requests', 'tripsArray', 'count'], value => value + 1 )

    case actionTypes.TRIPS_ARRAY_REQUEST_ERROR_LOG:
      return $$state.setIn(['requests', 'tripsArray', 'error'], data.error.message)

    case actionTypes.TRIPS_ARRAY_RECEIVE:
      return $$state.setIn(['requests', 'tripsArray', 'isFetching'], false)

    default:
      return $$state;
  }
}

import Immutable from 'immutable';

import actionTypes from '../constants/labResultFinderConstants';
import _ from 'lodash';

export const $$initialState = Immutable.fromJS({
  finderInput: {
    id: null,
    error: null,
    isSearching: false,
  },
});

export default function labResultInputReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.FINDER_INPUT_ID_UPDATE:
      return $$state.setIn(['finderInput', 'id'], data.inputString);

    case actionTypes.FINDER_INPUT_ERROR_UPDATE:
      return $$state.setIn(['finderInput', 'error'], data.errorString);

    case actionTypes.FINDER_INPUT_IS_SEARCHING_UPDATE:
      return $$state.setIn(['finderInput', 'isSearching'], data.isSearching)

    default:
      return $$state;
  }
}

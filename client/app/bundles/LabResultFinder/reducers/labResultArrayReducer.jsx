import Immutable from 'immutable';

import actionTypes from '../constants/labResultFinderConstants';
import _ from 'lodash';

export const $$initialState = Immutable.fromJS({
  labResultArray: [],
  searchResult: {
    error: null,
    output: {
      result_id: null,
      value: null,
      name: null,
      date: null,
      patient_id: null,
      lastThreeValues: []
    },
  },
});

export default function labResultArrayReducer($$state = $$initialState, action) {
  const { type, data } = action;

  switch (type) {
    case actionTypes.LAB_RESULT_ARRAY_UPDATE:
      return $$state.update('labResultArray', value => value.merge(data.array));

    case actionTypes.LAB_RESULT_ARRAY_FIND:
      if(_.isEmpty(data.resultId)) {
        return $$state.setIn(['searchResult', 'error'], null);
      } else {
        var findResult = $$state.get('labResultArray').find(x => x.get('result_id') === _.toInteger(data.resultId) );

        if(_.isEmpty(findResult)) {
          return $$state.setIn(['searchResult', 'error'], "Could not find lab result with entered result id");
        } else {
          var newState = $$state.toJS();
          var filteredArray = _.filter(_.filter(newState.labResultArray, {
            patient_id: findResult.get('patient_id'),
            name: findResult.get('name')
          }), result => { return findResult.get('date') > result.date });

          newState.searchResult.error = null;
          newState.searchResult.output = {
            result_id: findResult.get('result_id'),
            value: findResult.get('value'),
            name: findResult.get('name'),
            patient_id: findResult.get('patient_id'),
            date: findResult.get('date'),
            lastThreeValues: _.orderBy(filteredArray, 'date', 'desc').splice(0,3)
          };

          return Immutable.fromJS(newState);
        }
      }

    default:
      return $$state;
  }
}

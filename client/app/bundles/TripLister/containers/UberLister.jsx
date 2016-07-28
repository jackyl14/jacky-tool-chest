import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Immutable from 'immutable';

import List from '../components/List';
import * as tripListerActionCreators from '../actions/tripListerActionCreators';


const mapStateToProps = (state) => {
  return {
    tripsArray: state.$$tripListerStore.toJS().tripsArray,
    tripRequest: state.$$tripListerStore.toJS().requests.tripsArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(tripListerActionCreators, dispatch);
  const { requestTripArray } = actions;

  return {
    retryTripRequest: () => {
      dispatch(requestTripArray());
    },
  };
};


const UberLister = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default UberLister;

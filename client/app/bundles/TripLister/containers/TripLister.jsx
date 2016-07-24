import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Immutable from 'immutable';

import App from '../components/App';
import * as tripListerActionCreators from '../actions/tripListerActionCreators';


const mapStateToProps = (state) => {
  return {
    tripsArray: state.$$tripListerStore.toJS().tripsArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(tripListerActionCreators, dispatch);
  const { requestTripArray } = actions;

  return {
    handleOnComponentMount: () => {
      dispatch(requestTripArray());
    },
  };
};


const TripLister = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default TripLister;

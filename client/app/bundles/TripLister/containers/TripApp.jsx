import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Immutable from 'immutable';

import App from '../components/App';
import * as tripListerActionCreators from '../actions/tripListerActionCreators';


const mapStateToProps = (state) => {
  return {
    tripRequest: state.$$tripListerStore.toJS().requests.tripsArray,
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


const TripApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default TripApp;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import App from '../components/App';
import * as tripListerActionCreators from '../actions/tripListerActionCreators';


const mapStateToProps = (state) => {
  return {
  };
};

const TripLister = connect(
  mapStateToProps,
)(App);

export default TripLister;

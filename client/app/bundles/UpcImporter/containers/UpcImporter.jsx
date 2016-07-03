import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import App from '../components/App';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';


const mapStateToProps = (state) => {
  return {
    stageIndex: state.$$upcImporterStore.toJS().stageIndex,
  };
};

const UpcImporter = connect(
  mapStateToProps,
)(App);

export default UpcImporter;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import Result from '../components/Result';
import * as labResultFinderActionCreators from '../actions/labResultFinderActionCreators';

const mapStateToProps = (state) => {
  return {
    searchResult: state.$$labResultArrayStore.toJS().searchResult,
    isSearching: state.$$labResultInputStore.toJS().finderInput.isSearching,
  };
};

const LabResultContent = connect(
  mapStateToProps,
)(Result);

export default LabResultContent;

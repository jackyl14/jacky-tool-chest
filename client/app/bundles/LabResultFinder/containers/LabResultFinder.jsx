import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import Finder from '../components/Finder';
import * as labResultFinderActionCreators from '../actions/labResultFinderActionCreators';

import { checkNumbersOnly } from '../util/validations';

const mapStateToProps = (state) => {
  return {
    inputId: state.$$labResultInputStore.toJS().finderInput.id,
    inputError: state.$$labResultInputStore.toJS().finderInput.error,
    isSearching: state.$$labResultInputStore.toJS().finderInput.isSearching
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(labResultFinderActionCreators, dispatch);
  const {
    updateFinderInputId,
    updateFinderInputError,
    initiateLabResultSearch,
  } = actions;

  return {
    handleOnTextFieldChange: (e) => {
      var inputString = e.target.value;
      var errorString = checkNumbersOnly(inputString);
      dispatch(updateFinderInputId({ inputString }));
      dispatch(updateFinderInputError({ errorString }));
    },
    handleOnSearchClick: (inputId) => {
      dispatch(initiateLabResultSearch({resultId: inputId}));
    }
  };
}

const LabResultFinder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Finder);

export default LabResultFinder;

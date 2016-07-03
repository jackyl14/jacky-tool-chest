import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import StepOne from '../components/Progress/StepOne';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';

import {
  validateUPCA,
  checkStringFormat,
  checkStringSize,
  checkUPCADigitCalc
} from '../util/upca_validations';

const mapStateToProps = (state) => {
  const upcStore = state.$$upcImporterStore.toJS();
  return {
    inputString: upcStore.inputString,
    inputError: upcStore.inputError,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(upcImporterActionCreators, dispatch);
  const {
    updateInputString,
    updateStageIndex,
    updateInputError,
    updateSplitStringArray,
    updateErrorBank,
  } = actions;

  return {
    handleOnTextFieldChange: (e) => {
      var inputString = e.target.value;
      var errorString = checkStringFormat(inputString);
      dispatch(updateInputString({ inputString }));
      dispatch(updateInputError({ errorString }));
    },

    handleOnValidateTouch: (textValue) => {
      var separatedArray = _.split(textValue.trim(), /\s+/g);
      var errorBank = validateUPCA(separatedArray);
      dispatch(updateSplitStringArray({ separatedArray }));
      dispatch(updateErrorBank({ errorBank }));
      dispatch(updateStageIndex({ newStageIndex: 1}));
    },

  };
};

const EnterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepOne);

export default EnterList;

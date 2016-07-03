import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import StepThree from '../components/Progress/StepThree';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';

const mapStateToProps = (state) => {
  const upcStore = state.$$upcImporterStore.toJS();
  return {
    splitStringArray: upcStore.splitStringArray,
    submission: upcStore.submission,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(upcImporterActionCreators, dispatch);
  const { updateStageIndex } = actions;

  return {
    handleOnStartOverTouch: () => {
      dispatch(updateStageIndex({ newStageIndex: 0 }))
    },
  };
};

const ReceiveFeedback = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepThree);

export default ReceiveFeedback;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import StepTwo from '../components/Progress/StepTwo';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';

const mapStateToProps = (state) => {
  const upcStore = state.$$upcImporterStore.toJS();
  const splitStringArray = upcStore.splitStringArray;

  return {
    tabValue: upcStore.tabValue,
    hasErrors: !_.isEmpty(_.difference(_.keys(upcStore.errorBank).map(x => parseInt(x)), upcStore.deletedKeys)),
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(upcImporterActionCreators, dispatch);
  const {
    updateTabValue,
    updateStageIndex,
    uploadToQuri,
  } = actions;

  return {
    handleOnTabChange: (value) => {
      dispatch(updateTabValue({ tabValue: value }));
    },
    handleOnSubmitTouch: () => {
      dispatch(updateStageIndex({ newStageIndex: 2 }));
      dispatch(uploadToQuri());
    },
  };
};

const CheckList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepTwo);

export default CheckList;

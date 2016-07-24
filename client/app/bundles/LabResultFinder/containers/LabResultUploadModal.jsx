import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import Modal from '../components/Modal';
import * as labResultFinderActionCreators from '../actions/labResultFinderActionCreators';

import { checkNumbersOnly } from '../util/validations';

const mapStateToProps = (state) => {
  return {
    fileName: state.$$labResultModalStore.toJS().uploadModal.fileName,
    isOpened: state.$$labResultModalStore.toJS().uploadModal.isOpened,
    isUploading: state.$$labResultModalStore.toJS().uploadModal.isUploading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(labResultFinderActionCreators, dispatch);
  const {
    updateModalIsOpened,
    updateModalFileName,
    initiateUploadProcess,
  } = actions;

  return {
    handleOnModalClose: () => {
      dispatch(updateModalIsOpened({isOpened: false}));
    },
    handleOnFileNameSelection: (fileName) => {
      dispatch(updateModalFileName({fileName}));
    },
    handleOnUploadClick: (array) => {
      dispatch(initiateUploadProcess({array}));
    }
  };
}

const LabResultUploadModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

export default LabResultUploadModal;

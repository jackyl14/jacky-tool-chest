import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import EditDialog from '../components/EditDialog';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';

import {
  checkStringFormat,
  checkStringSize,
  checkUPCADigitCalc
} from '../util/upca_validations';

const mapStateToProps = (state) => {
  const upcStore = state.$$upcImporterStore.toJS();
  return {
    editDialog: upcStore.editDialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(upcImporterActionCreators, dispatch);
  const {
    updateEditDialog,
    updateEditDialogEntryString,
    updateEditDialogEntryError,
    updateEditDialogErrorMessages,
    updateSplitStringArrayEntry,
    removeErrorBankEntry,
  } = actions;

  return {
    handleEditDialogClose: () => {
      dispatch(updateEditDialog({ isOpened: false, entryValue: null }));
    },
    handleOnTextFieldChange: (e) => {
      var entryValue = e.target.value;
      var entryError = checkStringFormat(entryValue);
      dispatch(updateEditDialogEntryString({ entryValue }));
      dispatch(updateEditDialogEntryError({ entryError }));
    },
    handleEditDialogSubmit: (data) => {
      var errors = []
      errors.push(checkStringSize(data.entryValue));
      errors.push(checkUPCADigitCalc(data.entryValue));
      errors = _.compact(errors);

      if(_.isEmpty(errors)) {
        dispatch(updateEditDialog({ isOpened: false, entryValue: null }));
        dispatch(updateSplitStringArrayEntry({ entryIndex: data.entryIndex, entryValue: data.entryValue }));
        dispatch(removeErrorBankEntry({ entryIndex: data.entryIndex }));
      } else {
        dispatch(updateEditDialogErrorMessages({ errorMessages: errors }));
      }
    },
  };
};

const EditUPC = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDialog);

export default EditUPC;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import TableList from '../components/TableList';
import * as upcImporterActionCreators from '../actions/upcImporterActionCreators';

const mapStateToProps = (state) => {
  var upcStore = state.$$upcImporterStore.toJS();
  return {
    errorBank: upcStore.errorBank,
    array: upcStore.splitStringArray,
    deletedKeys: upcStore.deletedKeys,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(upcImporterActionCreators, dispatch);
  const {
    addDeleteKey,
    removeDeleteKey,
    updateEditDialog,
  } = actions;

  return {
    handleOnDeleteTouchTap: (index) => {
      dispatch(addDeleteKey({ index }));
    },
    handleOnRestoreTouchTap: (index) => {
      dispatch(removeDeleteKey({ index }));
    },
    handleOnEditTouchTap: (index) => {
      dispatch(updateEditDialog({ isOpened: true, entryIndex: index }));
    },
  };
};

const UPCATable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableList);

export default UPCATable;

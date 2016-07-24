import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Immutable from 'immutable';

import App from '../components/App';
import * as labResultFinderActionCreators from '../actions/labResultFinderActionCreators';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(labResultFinderActionCreators, dispatch);
  const { updateModalIsOpened } = actions;

  return {
    handleOnModalOpen: () => {
      dispatch(updateModalIsOpened({isOpened: true}));
    },
  };
}

const LabResultApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default LabResultApp;

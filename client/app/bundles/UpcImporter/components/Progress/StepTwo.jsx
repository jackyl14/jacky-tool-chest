import React, { PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import EditUPC from '../../containers/EditUPC';
import UPCATable from '../../containers/UPCATable';

import _ from 'lodash';

const styles = {
  headerText: {
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'normal',
    height: '24px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    marginBottom: '20px',
  },
  submitButton: {
    width: '100%',
    margin: '20px 0',
  }
}

class StepTwo extends React.Component {
  static propTypes = {
    tabValue: PropTypes.string.isRequired,
    hasErrors: PropTypes.bool.isRequired,
    handleOnTabChange: PropTypes.func.isRequired,
    handleOnSubmitTouch: PropTypes.func.isRequired,
  };

  render() {
    const {
      errorArray,
      editedArray,
      deletedArray,
    } = this.props;
    return (
      <div>
        <div style={styles.headerText}>
          To submit your list of UPC-A, please fix any errors or remove any unwanted UPC-A code.
        </div>
        <Tabs
          value={this.props.tabValue}
          onChange={this.props.handleOnTabChange}
        >
          <Tab label="Errors" value="a" >
            <UPCATable type="erroneous" />
          </Tab>
          <Tab label="Correct" value="b">
            <UPCATable type="correct" />
          </Tab>
          <Tab label="Deleted" value="c">
            <UPCATable type="deleted" />
          </Tab>
        </Tabs>
        <EditUPC />
        <div>
          <RaisedButton
            label="Submit"
            disabled={this.props.hasErrors}
            primary={true}
            style={styles.submitButton}
            onTouchTap={this.props.handleOnSubmitTouch}
          />
        </div>
      </div>
    );
  }
}
export default StepTwo;

import React, { PropTypes } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {red500} from 'material-ui/styles/colors';

class Bar extends React.Component {
  static propTypes = {
    stageIndex: PropTypes.number.isRequired,
  };

  render() {
    return (
      <Stepper activeStep={this.props.stageIndex}>
        <Step>
          <StepLabel>Enter UPC-A List</StepLabel>
        </Step>
        <Step>
          <StepLabel>Check UPC-A Format</StepLabel>
        </Step>
        <Step>
          <StepLabel>Evaluate UPC-A Feedback</StepLabel>
        </Step>
      </Stepper>
    );
  }
}
export default Bar;

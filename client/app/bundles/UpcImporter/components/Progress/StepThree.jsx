import React, { PropTypes } from 'react';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { greenA700, redA700 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import _ from 'lodash';

const styles = {
  container: {
    textAlign: 'center',
  },
  icons: {
    height: '100px',
    width: '100px',
  },
  restartButton: {
    width: '100%',
    margin: '20px 0',
  }
}

class StepThree extends React.Component {
  static propTypes = {
    splitStringArray: PropTypes.array.isRequired,
    submission: PropTypes.object.isRequired,
    handleOnStartOverTouch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div style={styles.container}>
        { this.props.submission.isLoading ? <CircularProgress size={2} /> : this.determineResult() }
        <div>
          <RaisedButton
            label="Start Over"
            primary={true}
            disabled={this.props.submission.isLoading}
            fullWidth={true}
            onTouchTap={this.props.handleOnStartOverTouch}
            style={styles.restartButton}
          />
        </div>
      </div>
    );
  }

  determineResult() {
    if(_.isEmpty(this.props.submission.error)) {
      return(
        <div>
          <CheckCircleIcon color={greenA700} style={styles.icons} />
          <br />
          <div>UPLOAD WAS A SUCCESS</div>
        </div>
      );
    } else {
      return(
        <div>
          <ErrorIcon color={redA700} style={styles.icons} />
          <br />
          <div>UPLOAD FAILED</div>
          <div>Please revise your UPC-A to ensure that they are in the correct format.</div>
        </div>
      );
    }
  }
}
export default StepThree;

import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import AlertIcon from 'material-ui/svg-icons/alert/error'

import _ from 'lodash';

const styles = {
  resultDiv: {
    parent: {
      margin: "100px 0px",
    },
    child: {
      margin: "0px auto",
      width: "80%",
    },
    errorMessage: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
    }
  },
}

class Result extends React.Component {
  static propTypes = {
    searchResult: PropTypes.object.isRequired,
    isSearching: PropTypes.bool.isRequired,
  };

  render() {
    const { isSearching } = this.props;
    const isResultErrorEmpty = _.isEmpty(this.props.searchResult.error);
    const isResultOutputNil = _.isNil(this.props.searchResult.output.value);

    return (
      <div style={styles.resultDiv.parent}>
        <div style={styles.resultDiv.child}>
          <CircularProgress
            size={2}
            style={{ display: isSearching ? "block" : "none" }}
          />
          <div style={{ display: isSearching ? "none" : "block"}}>
            <div style={ _.merge({display: isResultErrorEmpty ? "none" : "block" }, styles.resultDiv.errorMessage) }>
              <AlertIcon />
              <span>{this.props.searchResult.error}</span>
            </div>
            <div style={{ display: isResultOutputNil ? "none" : "block" }}>
              <div>Lab Result Id: {this.props.searchResult.output.result_id}</div>
              <div>Date: {this.props.searchResult.output.date}</div>
              <div>Patient Id: {this.props.searchResult.output.patient_id}</div>
              <div>Name: {this.props.searchResult.output.name}</div>
              <div>Value: {this.props.searchResult.output.value}</div>
              <div>
                Last Three Values:
                {
                  this.props.searchResult.output.lastThreeValues.map(result =>
                    <span key={result.result_id}>{` ${result.value}`}</span>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default Result;

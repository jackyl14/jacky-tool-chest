import React, { PropTypes } from 'react';
import { cyanA700 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import _ from 'lodash';

const styles = {
  finderDiv: {
    parent: {
      margin: "100px 0px",
    },
    child: {
      margin: "0px auto",
      width: "80%",
    },
    input: {
      width: "80%",
    },
    button: {
      width: "15%",
      margin: "0px 10px",
    }
  },
}

class Finder extends React.Component {
  static propTypes = {
    inputId: PropTypes.string.isRequired,
    inputError: PropTypes.string.isRequired,
    searchError: PropTypes.string.isRequired,
    handleOnTextFieldChange: PropTypes.func.isRequired,
    handleOnSearchClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div style={styles.finderDiv.parent}>
        <div style={styles.finderDiv.child}>
          <TextField
            ref="finderInput"
            hintText="Enter a valid result id"
            value={this.props.inputId}
            errorText={this.props.inputError}
            onChange={this.props.handleOnTextFieldChange}
            style={styles.finderDiv.input}
          />
          <RaisedButton
            label="Search"
            primary={true}
            disabled={!_.isEmpty(this.props.inputError) || this.props.isSearching}
            onClick={this.props.handleOnSearchClick.bind(this, this.props.inputId)}
            style={styles.finderDiv.button}
          />
        </div>
      </div>
    );
  };
}
export default Finder;

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import _ from 'lodash';

const styles = {
  fileInput: {
    marginRight: "10px"
  },
}

class Modal extends React.Component {
  static propTypes = {
    fileName: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    isUploading: PropTypes.bool.isRequired,
    handleOnModalClose: PropTypes.func.isRequired,
    handleOnUploadClick: PropTypes.func.isRequired,
    handleOnFileNameSelection: PropTypes.func.isRequired,
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleOnModalClose}
      />,
      <FlatButton
        label="Upload"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.uploadClickHandler.bind(this)}
      />,
    ];

    _.bindAll(this, "handleFileChange");

    return (
      <Dialog
        title="Upload New Lab Results"
        actions={actions}
        modal={true}
        open={this.props.isOpened}
      >
        <input
          ref="fileUpload"
          type="file"
          accept=".json"
          style={{"display" : "none"}}
          onChange={this.handleFileChange}
        />
        <RaisedButton
          label="Choose a File"
          keyboardFocused={true}
          onTouchTap={this.openFileDialog.bind(this)}
          style={styles.fileInput}
        />
        {this.props.fileName}
      </Dialog>
    );
  };

  componentWillMount() {
    this.file = {};
  }

  openFileDialog() {
    ReactDOM.findDOMNode(this.refs.fileUpload).click();
  };

  handleFileChange(e) {
    this.file = e.target.files[0];
    this.props.handleOnFileNameSelection(this.file.name);
  };

  uploadClickHandler() {
    var handleOnUploadClick = this.props.handleOnUploadClick;
    var reader = new FileReader;

    reader.onload = (event) => {
      var result = event.target.result;
      handleOnUploadClick(JSON.parse(result));
    };

    reader.readAsText(this.file);
  };

}
export default Modal;

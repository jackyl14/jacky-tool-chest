import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import _ from 'lodash';

class EditDialog extends React.Component {
  static propTypes = {
    editDialog: PropTypes.object.isRequired,
    handleEditDialogClose: PropTypes.func.isRequired,
    handleEditDialogSubmit: PropTypes.func.isRequired,
    handleOnTextFieldChange: PropTypes.func.isRequired,
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleEditDialogClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        disabled={!_.isEmpty(this.props.editDialog.entryError)}
        keyboardFocused={true}
        onTouchTap={
          this.props.handleEditDialogSubmit.bind(
            this,
            {
              entryIndex: this.props.editDialog.entryIndex,
              entryValue: this.props.editDialog.entryValue,
            }
          )
        }
      />,
    ];

    return (
      <Dialog
        ref="editUPCADialog"
        title={"Edit UPC-A"}
        actions={actions}
        modal={true}
        open={this.props.editDialog.isOpened}
      >
        <div>
          Entry Number: {this.props.editDialog.entryIndex + 1}
          <br />
          Original Entry: {this.props.editDialog.originalEntry}
          <br />
          <br />
        </div>
        <div className="errorList">
          Please fix the following errors:
          <ul>
            {
              this.props.editDialog.errorMessages.map( (element) => (
                <li>{element}</li>
              ))
            }
          </ul>
        </div>
        <TextField
          value={this.props.editDialog.entryValue}
          floatingLabelText="UPC-A"
          hintText="Re-enter the correct UPC-A "
          fullWidth={true}
          onChange={this.props.handleOnTextFieldChange}
          errorText={this.props.editDialog.entryError}
        />
      </Dialog>
    );
  }

  componentDidUpdate(prevProps) {
    var prev = prevProps.editDialog.errorMessages;
    var curr = this.props.editDialog.errorMessages;

    if(!_.isEqual(prev, curr) && !_.isEmpty(curr)) {
      $(".errorList").addClass("shake");
      setTimeout(
        function() { $(".errorList").removeClass("shake")},
        400
      );
    };
  };
}
export default EditDialog;

import React, { PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RestoreIcon from 'material-ui/svg-icons/content/add';

import _ from 'lodash';

const styles = {
  actionColumn: {
    width: '20%',
  },
  idColumn: {
    width: '10%',
  },
  entryColumn: {
    width: '20%',
  },
  errorColumn: {
    width: '50%',
  },
  button: {
    marginRight: '5px',
    minWidth: '26px'
  },
}

class TableList extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    array: PropTypes.array.isRequired,
    deletedKeys: PropTypes.array.isRequired,
    errorBank: PropTypes.object.isRequired,
    handleOnEditTouchTap: PropTypes.func.isRequired,
    handleOnDeleteTouchTap: PropTypes.func.isRequired,
    handleOnRestoreTouchTap: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Table
        height="200px"
        fixedHeader={true}
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn style={styles.idColumn}>ID</TableHeaderColumn>
            <TableHeaderColumn style={styles.entryColumn}>Entry</TableHeaderColumn>
            <TableHeaderColumn style={styles.errorColumn}>Error Messages</TableHeaderColumn>
            <TableHeaderColumn style={styles.actionColumn}>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.keysArray().map( (index) => (
              <TableRow key={index}>
                <TableRowColumn style={styles.idColumn}>{index + 1}</TableRowColumn>
                <TableRowColumn style={styles.entryColumn}>{_.at(this.props.array, index)}</TableRowColumn>
                <TableRowColumn style={styles.errorColumn}>{_.join(this.props.errorBank[index], "\n")}</TableRowColumn>
                <TableRowColumn style={styles.actionColumn}>
                  <span>
                    <RaisedButton
                      icon={<EditIcon />}
                      secondary={true}
                      fullWidth={true}
                      onTouchTap={this.props.handleOnEditTouchTap.bind(this, index)}
                      style={styles.button}
                    />
                  </span>
                  {
                    this.props.type !== "deleted" ?
                      <span>
                        <RaisedButton
                          icon={<DeleteIcon />}
                          primary={true}
                          onTouchTap={this.props.handleOnDeleteTouchTap.bind(this, index)}
                          style={styles.button}
                        />
                      </span> :
                      <span>
                        <RaisedButton
                          icon={<RestoreIcon />}
                          primary={true}
                          onTouchTap={this.props.handleOnRestoreTouchTap.bind(this, index)}
                          style={styles.button}
                        />
                      </span>
                  }
                </TableRowColumn>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    );
  };

  keysArray() {
    var errorKeys = _.keys(this.props.errorBank).map(x => parseInt(x));
    var deletedKeys = this.props.deletedKeys;
    var originalKeys = _.keys(this.props.array).map(x => parseInt(x));

    switch(this.props.type) {
      case 'erroneous':
        return _.difference(errorKeys, deletedKeys);
      case 'correct':
        return _.difference(originalKeys, _.concat(errorKeys, deletedKeys));
      case 'deleted':
        return deletedKeys;
    }
  };
}
export default TableList;

import React, { PropTypes } from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/Table';
import { grey900 } from 'material-ui/styles/colors';
import AlertIcon from 'material-ui/svg-icons/alert/error-outline';
import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';
import { formatDate, formatUSCurrency, formatCCLastFourDigits } from '../util/formatHelpers';

const styles = {
  buttons: {
    primary: {
      margin: "25px 25px",
    },
  },
  table: {
    header: {
      color: grey900,
      fontSize: "14px",
      fontWeight: "600",
    },
    dateColumn: {
      textAlign: "center",
    },
    fareColumn: {
      textAlign: "right",
    },
  },
  errorContent: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
}

class App extends React.Component {
  static propTypes = {
    tripsArray: PropTypes.array.isRequired,
    tripRequest: PropTypes.object.isRequired,
    retryTripRequest: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn style={_.merge({}, styles.table.header, styles.table.dateColumn)}>Pickup</TableHeaderColumn>
            <TableHeaderColumn style={styles.table.header}>Driver</TableHeaderColumn>
            <TableHeaderColumn style={_.merge({},styles.table.header, styles.table.fareColumn)}>Fare</TableHeaderColumn>
            <TableHeaderColumn style={styles.table.header}>Car</TableHeaderColumn>
            <TableHeaderColumn style={styles.table.header}>City</TableHeaderColumn>
            <TableHeaderColumn style={styles.table.header}>Payment Method</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { _.isNil(this.props.tripRequest.error) ? this.displaySuccessContent() : this.displayErrorContent() }
        </TableBody>
      </Table>
    );
  };

  displayErrorContent() {
    return (
      <div style={styles.errorContent}>
        <div>
          <AlertIcon />
          { "  There was an unexpected error loading your Uber trips."}
          <br />
          { _.isEmpty(this.props.tripRequest.error) ? null : `"${this.props.tripRequest.error}"` }
        </div>
        <div>
          <RaisedButton
            label={"Retry Again"}
            primary={true}
            onClick={this.props.retryTripRequest}
            backgroundColor={grey900}
            style={styles.buttons.primary}
          />
        </div>
      </div>
    )
  };

  displaySuccessContent() {
    return this.props.tripsArray.map( (trip) => (
        <TableRow key={trip.id}>
          <TableRowColumn style={styles.table.dateColumn}>{formatDate(trip.pickup_time)}</TableRowColumn>
          <TableRowColumn>{trip.driver.name}</TableRowColumn>
          <TableRowColumn style={styles.table.fareColumn}>{formatUSCurrency(trip.fare)}</TableRowColumn>
          <TableRowColumn>{trip.car.type}</TableRowColumn>
          <TableRowColumn>{trip.city}</TableRowColumn>
          <TableRowColumn>{formatCCLastFourDigits(trip.payment_method.last_four)}</TableRowColumn>
      </TableRow>
    ))
  };

}
export default App;

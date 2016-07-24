import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui/Table';
import { grey900 } from 'material-ui/styles/colors';

import _ from 'lodash';
import { formatDate, formatUSCurrency, formatCCLastFourDigits } from '../util/formatHelpers';

const styles = {
  app: {
    minWidth: "650px",
  },
  appBar: {
    backgroundColor: grey900,
  },
  table: {
    title: {
      fontSize: "22px",
      textAlign: "center",
      fontWeight: "300",
      margin: "20px 0px",
    },
    header: {
      color: grey900,
      fontSize: "14px",
      fontWeight: "600",
    },
    fareColumn: {
      textAlign: "right",
    },
  },
}

class App extends React.Component {
  static propTypes = {
    tripsArray: PropTypes.array.isRequired,
    handleOnComponentMount: PropTypes.func.isRequired,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            title="Trips"
            showMenuIconButton={ false }
            style={styles.appBar}
          />
          <div style={styles.table.title}>MY UBER TRIPS</div>
          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn style={styles.table.header}>Pickup</TableHeaderColumn>
                <TableHeaderColumn style={styles.table.header}>Driver</TableHeaderColumn>
                <TableHeaderColumn style={_.merge({},styles.table.header, styles.table.fareColumn)}>Fare</TableHeaderColumn>
                <TableHeaderColumn style={styles.table.header}>Car</TableHeaderColumn>
                <TableHeaderColumn style={styles.table.header}>City</TableHeaderColumn>
                <TableHeaderColumn style={styles.table.header}>Payment Method</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.props.tripsArray.map( (trip) => (
                  <TableRow key={trip.id}>
                    <TableRowColumn>{formatDate(trip.pickup_time)}</TableRowColumn>
                    <TableRowColumn>{trip.driver.name}</TableRowColumn>
                    <TableRowColumn style={styles.table.fareColumn}>{formatUSCurrency(trip.fare)}</TableRowColumn>
                    <TableRowColumn>{trip.car.type}</TableRowColumn>
                    <TableRowColumn>{trip.city}</TableRowColumn>
                    <TableRowColumn>{formatCCLastFourDigits(trip.payment_method.last_four)}</TableRowColumn>
                </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  };

  componentDidMount() {
    setTimeout(this.props.handleOnComponentMount, 500);
  };

}
export default App;

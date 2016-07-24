import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { grey900 } from 'material-ui/styles/colors';

import _ from 'lodash';

const styles = {
  app: {
    minWidth: "650px",
  },
  appBar: {
    backgroundColor: grey900,
  },
  appBody: {
    maxWidth: "960px",
    margin: "0px auto",
  },
  progressBar: {
    margin: "10px 30px",
    padding: "0 20px",
  },

}

class App extends React.Component {
  static propTypes = {
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
          <Table
            selectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>Pickup</TableHeaderColumn>
                <TableHeaderColumn>Driver</TableHeaderColumn>
                <TableHeaderColumn>Fare</TableHeaderColumn>
                <TableHeaderColumn>Car</TableHeaderColumn>
                <TableHeaderColumn>City</TableHeaderColumn>
                <TableHeaderColumn>Payment Method</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {
                this.tripsArray().map( (trip) => (
                  <TableRow key={trip.id}>
                    <TableRowColumn>trip.pickup_time</TableRowColumn>
                    <TableRowColumn>{trip.driver.name}</TableRowColumn>
                    <TableRowColumn>{trip.fare}</TableRowColumn>
                    <TableRowColumn>{trip.car.type}</TableRowColumn>
                    <TableRowColumn>{trip.city}</TableRowColumn>
                    <TableRowColumn>{trip.payment_method.last_four}</TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>
    );
  };

}
export default App;

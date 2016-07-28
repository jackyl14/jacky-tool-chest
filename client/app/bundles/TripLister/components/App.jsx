import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { grey900 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import UberLister from '../containers/UberLister';

import _ from 'lodash';
import { formatDate, formatUSCurrency, formatCCLastFourDigits } from '../util/formatHelpers';

const styles = {
  app: {
    minWidth: "650px",
  },
  appBar: {
    backgroundColor: grey900,
  },
  appTitle: {
    fontSize: "22px",
    textAlign: "center",
    fontWeight: "300",
    margin: "20px 0px",
  },
  loader: {
    textAlign: "center",
    marginTop: "50px",
  },
}

class App extends React.Component {
  static propTypes = {
    tripRequest: PropTypes.object.isRequired,
    handleOnComponentMount: PropTypes.func.isRequired,
  };

  render() {
    const shouldProgressBarShow = this.props.tripRequest.count === 0 || this.props.tripRequest.isFetching
    const shouldContentLoad = this.props.tripRequest.count > 0 && !this.props.tripRequest.isFetching
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            title="Trips"
            showMenuIconButton={ false }
            style={styles.appBar}
          />
          <div style={styles.appTitle}>MY UBER TRIPS</div>
          <div style={_.merge({display: shouldProgressBarShow ? "block" : "none"}, styles.loader) }>
            <CircularProgress size={2} />
          </div>
          <div style={{display: shouldContentLoad ? "block" : "none"}}>
            <UberLister />
          </div>
        </div>
      </MuiThemeProvider>
    );
  };

  componentDidMount() {
    setTimeout(this.props.handleOnComponentMount, 500);
  };

}
export default App;

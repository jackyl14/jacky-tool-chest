import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ProgressBar from './Progress/Bar';
import EnterList from '../containers/EnterList';
import CheckList from '../containers/CheckList';
import ReceiveFeedback from '../containers/ReceiveFeedback';

import _ from 'lodash';

const styles = {
  app: {
    minWidth: "650px",
  },
  progressBar: {
    margin: "10px 30px",
    padding: "0 20px",
  },

}

class App extends React.Component {
  static propTypes = {
    stageIndex: PropTypes.number.isRequired,
  };

  render() {
    const { stageIndex } = this.props;
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            title="UPC-A Importer"
            showMenuIconButton={ false }
          />
          <div style={ styles.progressBar }>
            <ProgressBar {...{ stageIndex }} />
          </div>
          <div style={{ margin: "10px 30px" }}>
            { this.determineStageContent(stageIndex) }
          </div>
        </div>
      </MuiThemeProvider>
    );
  };

  determineStageContent(stageIndex) {
    switch(stageIndex) {
      case 0:
        return <EnterList />;
      case 1:
        return <CheckList />;
      case 2:
        return <ReceiveFeedback />;
    }
  }
}
export default App;

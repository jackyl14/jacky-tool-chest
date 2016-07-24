import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { cyanA700 } from 'material-ui/styles/colors';
import LabResultFinder from '../containers/LabResultFinder';
import LabResultContent from '../containers/LabResultContent';
import LabResultUploadModal from '../containers/LabResultUploadModal';
import FlatButton from 'material-ui/FlatButton';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';

import _ from 'lodash';

const styles = {
  appBar: {
    backgroundColor: cyanA700,
  },
}

class App extends React.Component {
  static propTypes = {
    handleOnModalOpen: PropTypes.func.isRequired,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Lab Result Finder"
            showMenuIconButton={ false }
            iconElementRight={
              <div>
                <FlatButton
                  label="Upload New Lab Results"
                  icon={<FileUploadIcon />}
                  onTouchTap={this.props.handleOnModalOpen}
                />
                <LabResultUploadModal />
              </div>
            }
            style={styles.appBar}
          />
          <LabResultFinder />
          <LabResultContent />
        </div>
      </MuiThemeProvider>
    );
  };

}
export default App;

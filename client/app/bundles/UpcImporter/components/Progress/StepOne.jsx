import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';

class StepOne extends React.Component {
  static propTypes = {
    inputString: PropTypes.string.optional,
    inputError: PropTypes.string.optional,
    handleOnValidateTouch: PropTypes.func.isRequired,
    handleOnTextFieldChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12} sm={10}>
            <TextField
              name="upcInput"
              onChange={this.props.handleOnTextFieldChange}
              floatingLabelText="Please enter or paste a list of UPCs, each separated by spaces."
              floatingLabelFixed={true}
              floatingLabelStyle={{ fontSize: "24px", top: "20px", fontWeight: "200" }}
              hintText="082184090466 083085300265 etc."
              errorText={this.props.inputError}
              multiLine={true}
              fullWidth={true}
            />
          </Col>
          <Col xs={12} sm={2}>
            <RaisedButton
              label="Validate"
              primary={true}
              disabled={_.isEmpty(this.props.inputString) || !_.isEmpty(this.props.inputError)}
              onTouchTap={this.props.handleOnValidateTouch.bind(this, $('textarea').last().val())}
              style={{ width: "100%", margin: "20px 0"}}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default StepOne;

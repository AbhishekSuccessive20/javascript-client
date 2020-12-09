/* eslint-disable no-else-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable brace-style */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line react/prefer-stateless-function

import React, { Component } from 'react';
import validField, { disabledField, errorField, color } from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.value) {
      return (
        <span>
          <b>A Valid Input</b>
          <br />
          <br />
          <input type="text" style={validField} defaultValue={this.props.value} />
          <br />
        </span>
      );
    }
    else if (this.props.disabled) {
      return (
        <span>
          <b>This is a Disabled Input</b>
          <br />
          <br />
          <input type="text" style={disabledField} value="Disabled Input" disabled={this.props.disabled} />
          <br />
        </span>
      );
    }

    else if (this.props.error) {
      return (
        <span>
          <b>An input with errors</b>
          <br />
          <br />
          <input type="text" style={errorField} value="101" />
          <br />
          <span style={color}>Could not be greater than</span>
          <br />
        </span>
      );
    }

    return (
      <span />
    );
  }
}

export default TextField;

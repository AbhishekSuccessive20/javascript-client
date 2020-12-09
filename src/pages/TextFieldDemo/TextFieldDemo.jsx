/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { TextField } from '../../components';

class TextFieldDemo extends Component {
  render() {
    return (
      <>
        <TextField disabled={true} />
        <br />
        <TextField value="Accessible" />
        <br />
        <TextField error="error field" />
        <br />
      </>
    );
  }
}
export default TextFieldDemo;

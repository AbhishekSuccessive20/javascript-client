import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validField, { disabledField, errorField, color } from './style';

function TextField(props) {
  const {
    value, error, onChange, disabled,
  } = props;
  if (error) {
    return (
      <span>
        <input type="text" style={errorField} value={error} onChange={onChange} />
        <br />
      </span>
    );
  }
  if (disabled) {
    return (
      <span>
        <input type="text" style={disabledField} value={value} disabled={disabled} />
        <br />
      </span>
    );
  }
  return (
    <span>
      <input
        type="text"
        style={validField}
        defaultValue={value}
        onChange={onChange}
      />
      <br />
    </span>
  );
}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
TextField.defaultProps = {
  error: '',
  disabled: false,
};

export default TextField;

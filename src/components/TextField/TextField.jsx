import React from 'react';
import PropTypes from 'prop-types';
import validField, { disabledField, color, errorField } from './style';

function TextField(props) {
  const {
    value, error, onChange, disabled, onBlur, textVal,
  } = props;
  if (disabled) {
    return (
      <span>
        <b>This is Disabled Input</b>
        <br />
        <br />
        <input type="text" style={disabledField} value={value} disabled={disabled} onChange={onChange} />
        <br />
      </span>
    );
  }
  if (textVal && !error) {
    return (
      <span>
        <b>A Valid Input</b>
        <br />
        <br />
        <input type="text" style={disabledField} value={value} onChange={onChange} />
        <br />
      </span>
    );
  }
  if (textVal && error) {
    return (
      <span>
        <b>An input with errors</b>
        <br />
        <br />
        <input type="text" style={errorField} value={error} onChange={onChange} />
        <br />
        <span style={color}>Could not be greater than</span>
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
        onBlur={onBlur}
      />
      <br />
      {error ? <p style={color}>{error}</p> : ''}
      <br />
    </span>
  );
}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  textVal: PropTypes.bool,
  onBlur: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  disabled: false,
  textVal: false,
  onBlur: () => {},
};

export default TextField;

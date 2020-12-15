import React from 'react';
import PropTypes from 'prop-types';
import validField, { disabledField, errorField, color } from './style';

function TextField(props) {
  const {
    value, error, onChange, disabled, onBlur,
  } = props;
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
  onBlur: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  disabled: false,
  onBlur: () => {},
};

export default TextField;

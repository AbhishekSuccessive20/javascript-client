import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

const Button = (props) => {
  const {
    onClick,
    value,
    disabled,
    color,
    style,
  } = props;

  const styling = {
    ...styles,
    backgroundColor: color,
    color: style,
  };
  return (
    <>
      <button type="button" style={styling} onClick={onClick} disabled={disabled}>{value}</button>
    </>
  );
};

Button.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  style: {},
  color: 'primary',
  disabled: false,
};

export default Button;

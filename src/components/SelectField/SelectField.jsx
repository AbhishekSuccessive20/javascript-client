import React from 'react';
import PropTypes from 'prop-types';
import { style } from './style';

const SelectField = (props) => {
  const {
    options,
    defaultText,
    value,
    onChange,
    error,
  } = props;
  return (
    <>
      <select style={style} onChange={onChange}>
        <option value={value} key={{}}>{defaultText}</option>
        { options.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
      </select>
    </>
  );
};

SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

SelectField.defaultProps = {
  error: '',
  defaultText: 'Select',
  options: [],
};

export default SelectField;

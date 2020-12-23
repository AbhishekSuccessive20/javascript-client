import React from 'react';
import PropTypes from 'prop-types';
import { color } from './style';

const RadioGroup = (props) => {
  const {
    value,
    options,
    onChange,
    onBlur,
    error,
  } = props;

  return (
    <div>
      <div>
        {options.map((val) => (
          <div key={val.label}>
            <input type="radio" onBlur={onBlur} onChange={onChange} checked={val.value === value} value={val.value} />
            {val.label}
          </div>
        ))}
      </div>
      {error ? <p style={color}>{error}</p> : ''}
    </div>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
  onBlur: () => {},
};

export default RadioGroup;

import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    value,
    options,
    onChange,
    error,
  } = props;

  return (
    <>
      {options.map((val) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={val.label}>
          <input type="radio" onChange={onChange} checked={val.value === value} value={val.value} />
          {val.label}
        </div>
      ))}
    </>
  );
};
RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;

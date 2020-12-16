import PropTypes from 'prop-types';
import { operatorList } from '../../configs/constants';

const calculateResult = (first, second, operator) => {
  if (operatorList.includes(operator)) {
    // eslint-disable-next-line no-eval
    const result = eval(`${first} ${operator} ${second}`);
    return result;
  }
  return 'Invalid Operation';
};

const Math = (props) => {
  const {
    first,
    second,
    operator,
    children,
  } = props;
  const result = calculateResult(first, second, operator);
  return children ? children(first, second, operator, result) : `${first} ${operator} ${second} = ${result}`;
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

export default Math;

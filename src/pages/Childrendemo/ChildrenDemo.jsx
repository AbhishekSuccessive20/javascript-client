import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components/Math';

function ChildrenDemo(props) {
  return (
    <>
      <Typography>
        <Math first={5} second={2} operator="+" />
      </Typography>
      <Typography>
        <Math first={5} second={1} operator="-" />
      </Typography>
      <Typography>
        <Math first={5} second={2} operator="*" />
      </Typography>
      <Typography>
        <Math first={55} second={5} operator="/" />
      </Typography>
      <Typography>
        <Math first={5} second={0} operator="/" />
      </Typography>
      <Typography>
        <Math first={5} second={0} operator="^" />
      </Typography>
      <Typography>
        <Math first={5} second={10} operator="+">
          {(first, second, operator, result) => (
            <>{`Sum of ${first} and ${second} is ${result}`}</>
          )}
        </Math>
      </Typography>
      <br />
      <Math first={5} second={1} operator="-">
        {(first, second, operator, result) => (
          <>{`Difference of ${first} and ${second} is ${result}.`}</>
        )}
      </Math>
      <br />
      <Math first={5} second={0} operator="*">
        {(first, second, operator, result) => (
          <>{`When we multiply ${first} with ${second} then we get ${result} as a result.`}</>
        )}
      </Math>
      <br />
      <Typography>
        <Math first={5} second={0} operator="^">
          {(first, second, operator, result) => (
            <>{`${first} ${operator} ${second} is an ${result}.`}</>
          )}
        </Math>
      </Typography>
      <br />
      <Math first={5} second={0} operator="/">
        {(first, second, operator, result) => (
          <>{`When we divide ${first} with ${second} then we get ${result} as a result.`}</>
        )}
      </Math>
      <br />
      <Typography>
        <Math first={55} second={5} operator="/">
          {(first, second, operator, result) => (
            <>{`When we divide ${first} and ${second} we get ${result}`}</>
          )}
        </Math>
      </Typography>
    </>
  );
}

export default ChildrenDemo;

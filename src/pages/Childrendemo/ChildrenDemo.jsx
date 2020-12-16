import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components/Math';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Typography>
          <Math first={3} second={7} operator="+" />
        </Typography>
        <Typography>
          <Math first={5} second={9} operator="-" />
        </Typography>
        <Typography>
          <Math first={4} second={6} operator="*" />
        </Typography>
        <Typography>
          <Math first={2} second={5} operator="/" />
        </Typography>
        <Typography>
          <Math first={8} second={0} operator="/" />
        </Typography>
        <Typography>
          <Math first={9} second={0} operator="^" />
        </Typography>
        <Typography>
          <Math first={20} second={10} operator="+">
            {(first, second, operator, result) => (
              <div>{`Sum of ${first} and ${second} is ${result}`}</div>
            )}
          </Math>
        </Typography>
        <br />
        <Math first={8} second={7} operator="-">
          {(first, second, operator, result) => (
            <div>{`Difference of ${first} and ${second} is ${result}.`}</div>
          )}
        </Math>
        <br />
        <Math first={9} second={0} operator="*">
          {(first, second, operator, result) => (
            <div>{`When we multiply ${first} with ${second} then we get ${result} as a result.`}</div>
          )}
        </Math>
        <br />
        <Typography>
          <Math first={6} second={0} operator="^">
            {(first, second, operator, result) => (
              <div>{`${first} ${operator} ${second} is an ${result}.`}</div>
            )}
          </Math>
        </Typography>
        <br />
        <Math first={3} second={0} operator="/">
          {(first, second, operator, result) => (
            <div>{`When we divide ${first} with ${second} then we get ${result} as a result.`}</div>
          )}
        </Math>
        <br />
        <Typography>
          <Math first={2} second={5} operator="/">
            {(first, second, operator, result) => (
              <div>{`When we divide ${first} and ${second} we get ${result}`}</div>
            )}
          </Math>
        </Typography>
      </>
    );
  }
}

export default ChildrenDemo;

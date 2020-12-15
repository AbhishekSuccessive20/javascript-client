import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';

import {
  cricketOptions, cricketStr, footballOptions, footballStr, options,
} from '../../configs/constants';

class InputDemo extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSportChange = (event) => {
    this.setState({ sports: event.target.value, cricket: '', football: '' });
  };

  handleSportValueChange = (event) => {
    const { sports } = this.state;
    if (sports === cricketStr) {
      this.setState({
        cricket: event.target.value,
      });
    } else if (sports === footballStr) {
      this.setState({
        football: event.target.value,
      });
    } else {}
  };

  render() {
    const {
      name, sports, cricket, football,
    } = this.state;
    // eslint-disable-next-line no-console
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField value={name} onChange={this.handleNameChange} />
        <h3>Select the game you play?</h3>
        <SelectField
          value=""
          options={options}
          onChange={this.handleSportChange}
        />

        {
          sports === cricketStr ? (
            <div>
              <h3>What you do?</h3>
              <RadioGroup
                value={cricket}
                options={cricketOptions}
                onChange={this.handleSportValueChange}
              />
            </div>
          ) : (
            <div />
          )
        }

        {
          sports === footballStr ? (
            <div>
              <h3>What you do?</h3>
              <RadioGroup
                value={football}
                options={footballOptions}
                onChange={this.handleSportValueChange}
              />
            </div>
          ) : (
            <div />
          )
        }
      </>
    );
  }
}

export default InputDemo;

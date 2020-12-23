import React, { Component } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';

import {
  cricketOptions, cricketStr, footballOptions, footballStr, options,
} from '../../configs/constants';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3).label('Name'),
    sport: yup.string().required().label('Sport'),
    cricket: yup.string().when('sport', { is: 'cricket', then: yup.string().required().label('What you do') }),
    football: yup.string().when('sport', { is: 'football', then: yup.string().required().label('What you do') }),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sports: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSportChange = (e) => {
    this.setState({ sports: e.target.value, cricket: '', football: '' });
  };

  handleSportValueChange = (e) => {
    const { sports } = this.state;
    if (sports === cricketStr) {
      this.setState({
        cricket: e.target.value,
      });
    } else if (sports === footballStr) {
      this.setState({
        football: e.target.value,
      });
    }
  };

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  hasErrors = () => {
    const { state } = this;
    try {
      this.schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  }

  handleButtonError = () => {
    if (this.hasErrors()) {
      return false;
    }
    return true;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  render() {
    const {
      name, sport, cricket, football,
    } = this.state;
    return (
      <>
        <div>
          <p><b>Name:</b></p>
          <TextField value={name} error={this.getError('name')} onChange={this.handleNameChange} onBlur={() => this.isTouched('name')} />
          <p><b>Select the game you play?</b></p>
          <SelectField
            value=""
            error={this.getError('sport')}
            onChange={this.handleSportChange}
            options={options}
            onBlur={() => this.isTouched('sport')}
          />

          <div>
            {
              sport === cricketStr ? (
                <div>
                  <h3>What you do?</h3>
                  <RadioGroup
                    value={cricket}
                    options={cricketOptions}
                    onChange={this.handleSportValueChange}
                    onBlur={() => this.isTouched(sport)}
                    error={this.getError(sport)}
                  />
                </div>
              ) : (
                <div />
              )
            }

            {
              sport === footballStr ? (
                <div>
                  <h3>What you do?</h3>
                  <RadioGroup
                    value={football}
                    options={footballOptions}
                    onChange={this.handleSportValueChange}
                    onBlur={() => this.isTouched(sport)}
                    error={this.getError(sport)}
                  />
                </div>
              ) : (
                <div />
              )
            }

          </div>

        </div>

        <div style={{ textAlign: 'right', marginRight: '5%', marginTop: '3%' }}>
          <Button value="Cancel" onClick={() => { }} />
           &nbsp;
          {(this.handleButtonError()) ? <Button value="Submit" onClick={() => { }} color="#4CAF50" /> : <Button value="Submit" onClick={() => { }} disabled />}
        </div>

      </>
    );
  }
}
export default InputDemo;

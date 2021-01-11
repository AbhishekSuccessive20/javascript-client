import React, { useState } from 'react';

import * as yup from 'yup';

import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';

import {
  options,
  cricketOptions,
  cricketStr,
  footballOptions,
  footballStr,
} from '../../configs/constants';

function InputDemo(props) {
  const schema = yup.object().shape({
    name: yup.string().required().min(3).label('Name'),
    sport: yup.string().required().label('Sport'),
    cricket: yup.string().when('sport', { is: 'cricket', then: yup.string().required().label('What you do') }),
    football: yup.string().when('sport', { is: 'football', then: yup.string().required().label('What you do') }),
  });

  const [state, setState] = useState({
    name: '',
    sport: '',
    cricket: '',
    football: '',
    touched: {
      name: false,
      sport: false,
      cricket: false,
      football: false,
    },
  });

  const handleNameChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const handleSportChange = (e) => {
    setState({
      ...state, sport: e.target.value, cricket: '', football: '',
    });
  };

  const handleSportValueChange = (e) => {
    const { sport } = state;
    if (sport === cricketStr) {
      setState({
        ...state,
        cricket: e.target.value,
      });
    } else if (sport === footballStr) {
      setState({
        ...state,
        football: e.target.value,
      });
    } else {}
  };

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const getError = (field) => {
    const { touched } = state;
    if (touched[field] && hasErrors()) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return '';
  };

  const handleButtonError = () => {
    if (hasErrors()) {
      return false;
    }
    return true;
  };

  const isTouched = (field) => {
    const { touched } = state;
    setState({
      ...state,
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  const {
    name, sport, cricket, football,
  } = state;

  const handleSubmit = () => {
    if (cricket) {
      // eslint-disable-next-line no-console
      console.log({ name, sport, cricket });
    } else {
      // eslint-disable-next-line no-console
      console.log({ name, sport, football });
    }
  };

  return (
    <>
      <div>
        <p><b>Name *</b></p>
        <TextField value={name} error={getError('name')} onChange={handleNameChange} onBlur={() => isTouched('name')} />
        <p><b>Select the game you play? *</b></p>
        <SelectField
          value=""
          error={getError('sport')}
          onChange={handleSportChange}
          options={options}
          onBlur={() => isTouched('sport')}
        />

        <div>
          {
            sport === cricketStr ? (
              <div>
                <h3>What you do? *</h3>
                <RadioGroup
                  error={getError(sport)}
                  value={cricket}
                  options={cricketOptions}
                  onChange={handleSportValueChange}
                  onBlur={() => isTouched(sport)}
                />
              </div>
            ) : (
              <div />
            )
          }

          {
            sport === footballStr ? (
              <div>
                <h3>What you do? *</h3>
                <RadioGroup
                  error={getError(sport)}
                  value={football}
                  options={footballOptions}
                  onChange={handleSportValueChange}
                  onBlur={() => isTouched(sport)}
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
        {(handleButtonError()) ? <Button value="Submit" onClick={handleSubmit} color="#4CAF50" /> : <Button value="Submit" onClick={() => { }} disabled />}
      </div>

    </>
  );
}

export default InputDemo;

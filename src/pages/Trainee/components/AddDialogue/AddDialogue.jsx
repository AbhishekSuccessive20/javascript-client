import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Grid,
  InputAdornment,
  Button,
  IconButton,
} from '@material-ui/core';

import {
  Visibility, VisibilityOff, Email, Person,
} from '@material-ui/icons';

import { SnackBarContext } from '../../../../contexts';

class AddDialogue extends Component {
    schema = yup.object().shape({
      name: yup
        .string()
        .required()
        .min(3)
        .label('Name'),
      email: yup
        .string()
        .email()
        .required()
        .label('Email'),
      password: yup
        .string()
        .required()
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/,
          'Must contain 8 characters atleast 1 uppercase letter, 1 lowercase and 1 number',
        )
        .label('Password'),
      confirmPswd: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Must match Password')
        .required()
        .label('Confirm Password'),
    });

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        password: '',
        confirmPswd: '',
        showPassword: false,
        showMatchPassword: false,
        touched: {
          name: false,
          email: false,
          password: false,
          confirmPswd: false,
        },
      };
    }

    handleClickShowPassword = () => {
      this.setState((state) => ({ showPassword: !state.showPassword }));
    };

    handleClickShowMatchPassword = () => {
      this.setState((state) => ({ showMatchPassword: !state.showMatchPassword }));
    };

    handleValue = (item) => (event) => {
      const { touched, confirmPswd } = this.state;
      this.setState({
        [item]: event.target.value,
        touched: { ...touched, [item]: true },
      }, () => {
        if (item === 'password' && confirmPswd !== '') {
          this.getError('confirmPswd');
        }
        this.getError(item);
      });
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

    isValid = (item) => {
      const { state } = this;
      const { touched } = state;

      if (touched[[item]] === false) {
        return false;
      }
      return this.hasErrors();
    }

    onSubmit = (event, value) => {
      const { onSubmit } = this.props;
      const {
        name,
        email,
        password,
      } = this.state;
      // eslint-disable-next-line no-console
      console.log({ name, email, password });
      value('Successfully Added!', 'success');
      onSubmit({ name, email, password });
    }

    onClose = () => {
      this.props.open = false;
    }

    render() {
      const { open, onClose, onSubmit } = this.props;
      const {
        name,
        email,
        password,
        confirmPswd,
        showPassword,
        showMatchPassword,
      } = this.state;
      return (
        <SnackBarContext.Consumer>
          {
            (value) => (
              <Dialog open={open} onClose={onClose} maxWidth="lg">
                <DialogTitle>Add Trainee</DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter your trainee details</DialogContentText>
                  <TextField
                    label="Name *"
                    value={name}
                    variant="outlined"
                    onChange={this.handleValue('name')}
                    onBlur={() => this.isTouched('name')}
                    helperText={this.getError('name')}
                    error={this.isValid('name')}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <br />
                  <TextField
                    label="Email Address"
                    value={email}
                    variant="outlined"
                    onChange={this.handleValue('email')}
                    onBlur={() => this.isTouched('email')}
                    helperText={this.getError('email')}
                    error={this.isValid('email')}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <br />
                  <Grid container>
                    <Grid item xl={6} xs={6}>
                      <TextField
                        label="Password"
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        onChange={this.handleValue('password')}
                        onBlur={() => this.isTouched('password')}
                        helperText={this.getError('password')}
                        error={this.isValid('password')}
                        style={{ marginRight: '5%' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton onClick={this.handleClickShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff /> }
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xl={6} xs={6}>
                      <TextField
                        label="Confirm Password"
                        value={confirmPswd}
                        type={showMatchPassword ? 'text' : 'password'}
                        variant="outlined"
                        onChange={this.handleValue('confirmPswd')}
                        onBlur={() => this.isTouched('confirmPswd')}
                        helperText={this.getError('confirmPswd')}
                        error={this.isValid('confirmPswd')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton onClick={this.handleClickShowMatchPassword}>
                                {showMatchPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.onSubmit(event, value)}
                    disabled={!(this.handleButtonError())}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            )
          }
        </SnackBarContext.Consumer>
      );
    }
}

AddDialogue.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

AddDialogue.defaultProps = {
  open: false,
  onClose: () => {},
  onSubmit: () => {},
};

export default AddDialogue;

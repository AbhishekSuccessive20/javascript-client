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
  CircularProgress,
} from '@material-ui/core';

import {
  Visibility, VisibilityOff, Email, Person, PersonOutline,
} from '@material-ui/icons';

import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../lib/utils/api';

class AddDialogue extends Component {
    schema = yup.object().shape({
      id: yup
        .string()
        .required()
        .label('Id'),
      name: yup
        .string()
        .required()
        .min(3)
        .label('Name'),
      email: yup
        .string()
        .email()
        .required()
        .matches(/^[A-Za-z0-9._%+-]+@successive.tech$/,
          'Invalid Domain')
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
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPswd: '',
        showPassword: false,
        showMatchPassword: false,
        touched: {
          id: false,
          name: false,
          email: false,
          password: false,
          confirmPswd: false,
        },
        progress: false,
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

    /* onSubmit = async (event, openSnackBar) => {
      event.preventDefault();
      const { onSubmit } = this.props;
      const {
        id,
        name,
        email,
        password,
        progress,
      } = this.state;
      this.setState({
        progress: true,
      });
      const header = localStorage.getItem('token');
      await callApi('/trainee', 'POST', {
        id, name, email, password,
      }, header)
        .then((response) => {
          openSnackBar(response.data.message, 'success');
          this.setState({
            id: '',
            name: '',
            email: '',
            password: '',
            showPassword: false,
            confirmPswd: '',
            touched: {
              id: false,
              name: false,
              email: false,
              password: false,
              confirmPswd: false,
            },
            progress: false,
          });
          // eslint-disable-next-line no-console
          console.log({
            id, name, email, password,
          });
          onSubmit();
        })
        .catch((err) => {
          this.setState({
            progress: false,
          });
          openSnackBar(err.response.data.message, 'error');
        });
    } */

    onClose = () => {
      this.props.open = false;
    }

    render() {
      const {
        open, onClose, onSubmit,
      } = this.props;
      const {
        id,
        name,
        email,
        password,
        confirmPswd,
        showPassword,
        showMatchPassword,
        progress,
      } = this.state;
      return (
        <SnackBarContext.Consumer>
          {
            (openSnackBar) => (
              <Dialog open={open} onClose={onClose} maxWidth="lg">
                <DialogTitle>Add Trainee</DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter your trainee details</DialogContentText>
                  <TextField
                    label="Id *"
                    value={id}
                    variant="outlined"
                    onChange={this.handleValue('id')}
                    onBlur={() => this.isTouched('id')}
                    helperText={this.getError('id')}
                    error={this.isValid('id')}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <br />
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
                  { progress ? (
                    <Button variant="contained" disabled>
                      <CircularProgress size={20} />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => this.onSubmit(event, openSnackBar)}
                      disabled={!(this.handleButtonError())}
                    >
                      Submit
                    </Button>
                  )}
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

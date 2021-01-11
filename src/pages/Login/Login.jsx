import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';

import {
  Avatar, Button, Paper, Typography, TextField, IconButton, InputAdornment, CircularProgress,
} from '@material-ui/core';

import {
  Email, Visibility, VisibilityOff,
} from '@material-ui/icons';

import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { SnackBarContext } from '../../contexts';

import callApi from '../../lib/utils/api';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  textfield: {
    marginTop: theme.spacing(3),
  },
});

class Login extends Component {
  schema = yup.object().shape({
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
      .label('Password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      redirect: false,
      message: '',
      touched: {
        email: false,
        password: false,
      },
      progress: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleValue = (item) => (event) => {
    const { touched } = this.state;
    this.setState({
      [item]: event.target.value,
      touched: { ...touched, [item]: true },
    }, () => {
      this.getError(item);
    });
  };

  handleSignIn = async (event, openSnackBar) => {
    event.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;
    this.setState({
      progress: true,
    });
    await callApi('/user/login', 'POST', { email, password })
      .then((response) => {
        localStorage.setItem('token');
        openSnackBar('Login Successfull!', 'success');
        history.push('/trainee');
      })
      .catch((err) => {
        this.setState({
          email: '',
          password: '',
          showPassword: false,
          touched: {
            email: false,
            password: false,
          },
          progress: false,
        });
        openSnackBar('Error while logging in!', 'error');
      });
  }

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

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
    return null;
  }

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });
    const response = await callApi('user/login', 'post', data);
    ls.set('token', response.data);
    this.setState({ loading: false });
    const Token = ls.get('token');
    if (Token !== 'undefined') {
      this.setState({
        redirect: true,
        hasError: false,
        message: 'Login successfully',
      });
      const { message } = this.state;
      openSnackBar(message, 'success');
    } else {
      this.setState({
        message: 'Email or Password is incorrect',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
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

  render() {
    const { classes } = this.props;
    const {
      email, password, showPassword, progress,
    } = this.state;
    const temp = false;
    return (
      <SnackBarContext.Consumer>
        {
          (openSnackBar) => (
            <main className={classes.main}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <br />
                <TextField
                  label="Email Address"
                  value={email}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleValue('email')}
                  onBlur={() => this.isTouched('email')}
                  error={this.isValid('email')}
                  helperText={this.getError('email')}
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
                <TextField
                  label="Password"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleValue('password')}
                  onBlur={() => this.isTouched('password')}
                  error={this.isValid('password')}
                  helperText={this.getError('password')}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={this.handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {progress ? (
                  <Button variant="contained" className={classes.submit} disabled>
                    <CircularProgress size={20} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!(this.handleButtonError())}
                    onClick={(event) => this.handleSignIn(event, openSnackBar)}
                  >
                    Sign in
                  </Button>
                )}
              </Paper>
            </main>
          )
        }
      </SnackBarContext.Consumer>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(Login);

import React, { Component } from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from 'yup';
import ls from 'local-storage';
import {
  Dialog,
  DialogTitle,
  TextField,
  Grid,
  Button,
  DialogContent,
  DialogContentText,
  withStyles,
  DialogActions,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../lib/utils/api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required field'),
  email: yup.string().required('Email Address is required field').matches(/^[A-Za-z.0-9]{3,}@[A-Za-z]{10,10}[.]{1,1}[A-Za-z]{4,4}$/, 'Email Address must be valid field'),
  password: yup.string().min(3, 'Please enter min. 3 character').required('Password is required field'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required field'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  input: {
    paddingRight: 5,
  },
});

class AddDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isOpen: false,
      loading: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      hasError: false,
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  onClickHandler = async (data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });
    await callApi('trainee/create', 'post', data);
    this.setState({ loading: false });
    const Token = ls.get('token');
    if (Token !== 'undefined') {
      this.setState({
        hasError: false,
        message: 'This is a successfully added trainee message',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        hasError: false,
        message: 'error in submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  handleBlur = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema.isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
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

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {},
    });
  }

  render() {
    const {
      classes, isOpen, onClose,
    } = this.props;
    const {
      name, error, hasError, email, password, confirmPassword, loading,
    } = this.state;
    this.hasErrors();
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="simple-dialog-title">Add Trainee</DialogTitle>
        <DialogContent className={classes.root}>
          <DialogContentText className={classes.Details}>
            Enter your trainee details
          </DialogContentText>
          <TextField
            label="Name *"
            type="text"
            autoComplete="off"
            fullWidth
            value={name}
            error={error.name}
            helperText={this.getError('name')}
            onBlur={() => this.isTouched('name')}
            onChange={this.handleChange('name')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <PersonIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
          <TextField
            label="Email Address"
            type="text"
            autoComplete="off"
            fullWidth
            value={email}
            error={error.email}
            helperText={this.getError('email')}
            onBlur={() => this.isTouched('email')}
            onChange={this.handleChange('email')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <EmailIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Password"
                type="password"
                autoComplete="off"
                fullWidth
                value={password}
                error={error.password}
                helperText={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                onChange={this.handleChange('password')}
                placeholder=""
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <VisibilityOffIcon className={classes.input} />
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                autoComplete="off"
                fullWidth
                type="password"
                value={confirmPassword}
                error={error.confirmPassword}
                helperText={this.getError('confirmPassword')}
                onBlur={() => this.isTouched('confirmPassword')}
                onChange={this.handleChange('confirmPassword')}
                placeholder=""
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <VisibilityOffIcon className={classes.input} />
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <SnackBarContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  this.onClickHandler({
                    name, email, password, confirmPassword,
                  }, openSnackBar);
                  this.formReset();
                }}
                disabled={loading || hasError}
                open={isOpen}
                onClose={onClose}
              >
                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Submitting</span>}
                {!loading && <span>Submit</span>}
              </Button>
            )}
          </SnackBarContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}
AddDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default withStyles(useStyles)(AddDialog);

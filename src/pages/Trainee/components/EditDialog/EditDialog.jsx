import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';

import { Email, Person } from '@material-ui/icons';
import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../lib/utils/api';

class EditDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3).label('Name'),
    email: yup.string().email()
      .matches(/^[A-Za-z0-9._%+-]+@successive.tech$/,
        'Invalid Domain')
      .required()
      .label('Email'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      touched: {
        name: false,
        email: false,
      },
      loader: false,
    };
  }

  handleNameValue = (event) => {
    const { details } = this.props;
    const { email, touched } = this.state;
    if (email === '') {
      this.setState({
        email: details.email,
      });
    }
    this.setState({
      name: event.target.value,
      touched: {
        ...touched,
        name: true,
      },
    });
  }

  handleEmailValue = (event) => {
    const { details } = this.props;
    const { name, touched } = this.state;
    if (name === '') {
      this.setState({
        name: details.name,
      });
    }
    this.setState({
      email: event.target.value,
      touched: {
        ...touched,
        email: true,
      },
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
    const { editOpen, onClose, details } = this.props;
    const { loader } = this.state;
    return (
      <SnackBarContext.Consumer>
        {
          (openSnackBar) => (
            <Dialog open={editOpen} onClose={this.handleClose}>
              <DialogTitle>Edit Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>Enter your trainee details</DialogContentText>
                <TextField
                  label="Name"
                  defaultValue={details.name}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleNameValue}
                  onBlur={() => this.isTouched('name')}
                  helperText={this.getError('name')}
                  error={this.isValid('name')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Email Address"
                  defaultValue={details.email}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleEmailValue}
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
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={onClose}>
                  Cancel
                </Button>
                {
                  loader ? (
                    <Button variant="contained" disabled>
                      <CircularProgress size={20} />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(event) => this.editOpen(event, openSnackBar)}
                      disabled={!(this.handleButtonError())}
                    >
                      Submit
                    </Button>
                  )
                }
              </DialogActions>
            </Dialog>
          )
        }
      </SnackBarContext.Consumer>
    );
  }
}

EditDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  editOpen: PropTypes.bool,
};

EditDialog.defaultProps = {
  onClose: () => {},
  editOpen: false,
};

export default EditDialog;

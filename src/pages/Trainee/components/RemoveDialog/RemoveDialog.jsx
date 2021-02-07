import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContentText, DialogTitle, Button, CircularProgress,
} from '@material-ui/core';

import { SnackBarContext } from '../../../../contexts';

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loading: false,
    };
  }

handleChange = (prop) => (event) => {
  // eslint-disable-next-line no-console
  this.setState({ [prop]: event.target.value }, () => console.log(this.state));
};

handleClose = () => {
  this.setState({ open: false });
};

onClickHandler = async (Data, openSnackBar) => {
  this.setState({
    loading: true,
  });
  const { onSubmit } = this.props;
  const { deleteTrainee, refetch } = this.props;
  const { _id: id } = Data;
  const response = await deleteTrainee({ variables: { id } });
  this.setState({ loading: false });
  if (response.data.deleteTrainee !== 'undefined') {
    refetch();
    this.setState({
      message: 'Deleted Successfully ',
    }, () => {
      const { message } = this.state;
      onSubmit(Data);
      openSnackBar(message, 'success');
    });
  } else {
    this.setState({
      message: 'Error While Deleting',
    }, () => {
      const { message } = this.state;
      openSnackBar(message, 'error');
    });
  }
}

render() {
  const {
    open, onClose, onSubmit, data,
  } = this.props;
  const { loading } = this.state;
  return (
    <Dialog
      open={open}
      onClose={() => this.handleClose()}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
      <DialogContentText style={{ marginLeft: 25 }}>
        Do you really want to remove the trainee?
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
                  onSubmit({ data });
                  this.onClickHandler(data, openSnackBar);
                }}
              >
                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Deleting</span>}
                {!loading && <span>Delete</span>}
              </Button>
            )}
          </SnackBarContext.Consumer>
        </DialogActions>
      </DialogContentText>
    </Dialog>
  );
}
}

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteTrainee: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
export default RemoveDialog;

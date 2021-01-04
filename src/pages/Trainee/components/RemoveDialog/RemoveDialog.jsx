import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@material-ui/core';

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDeleteClose = () => {
    const { details, onClose } = this.props;
    // eslint-disable-next-line no-console
    console.log('Deleted Item', details);
    onClose();
  };

  render() {
    const { deleteOpen, onClose } = this.props;
    return (
      <Dialog
        open={deleteOpen}
        onClose={onClose}
      >
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to remove trainee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDeleteClose} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

RemoveDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  deleteOpen: PropTypes.bool,
};

RemoveDialog.defaultProps = {
  onClose: () => {},
  deleteOpen: false,
};

export default RemoveDialog;

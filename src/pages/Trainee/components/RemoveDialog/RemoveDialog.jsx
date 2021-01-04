import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@material-ui/core';

import { SnackBarContext } from '../../../../contexts';

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDeleteClose = (event, value) => {
    event.preventDefault();
    const { details, onClose } = this.props;
    const originalDate = new Date(details.createdAt);
    const dateCheck = new Date('2019-02-14');
    if (originalDate > dateCheck) {
      // eslint-disable-next-line no-console
      console.log('Deleted Item', details);
      value('Successfully Deleted!', 'success');
    } else {
      value('Can\'t Delete!', 'error');
    }
    onClose();
  };

  render() {
    const { deleteOpen, onClose } = this.props;
    return (
      <SnackBarContext.Consumer>
        {
          (value) => (
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
                <Button onClick={(event) => this.handleDeleteClose(event, value)} color="primary" variant="contained">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )
        }
      </SnackBarContext.Consumer>
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

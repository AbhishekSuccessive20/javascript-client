import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress,
} from '@material-ui/core';

import { SnackBarContext } from '../../../../contexts';
import callApi from '../../../../lib/utils/api';
import { date } from '../../../../configs/constants';

function RemoveDialog(props) {
  const [loader, setLoader] = useState(false);
  const handleDeleteClose = (event, openSnackBar) => {
    event.preventDefault();
    const { details, onClose, onSubmit } = props;
    const originalDate = new Date(details.createdAt);
    const dateCheck = new Date(date);
    setLoader(true);
    if (originalDate > dateCheck) {
      callApi(`/trainee/${details.id}`, 'DELETE', {}, localStorage.getItem('token'))
        .then((res) => {
          openSnackBar(res.data.message, 'success');
          onSubmit();
        })
        .catch((err) => {
          openSnackBar(err.response.data.message, 'error');
        });
    } else {
      openSnackBar('Can\'t Delete!', 'error');
    }
    setLoader(false);
    onClose();
  };

  const { deleteOpen, onClose } = props;
  return (
    <SnackBarContext.Consumer>
      {
        (openSnackBar) => (
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
              {
                loader ? (
                  <Button variant="contained" disabled>
                    <CircularProgress size={20} />
                  </Button>
                ) : (
                  <Button onClick={(event) => handleDeleteClose(event, openSnackBar)} color="primary" variant="contained">
                    Delete
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

RemoveDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  deleteOpen: PropTypes.bool,
};

RemoveDialog.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  deleteOpen: false,
};

export default RemoveDialog;

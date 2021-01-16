import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

export const SnackBarContext = createContext(() => {});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars(props) {
  const classes = useStyles();
  const {
    message, status, onClose, open,
  } = props;

  return (
    <div className={classes.root}>
      <Snackbar open={open} onClose={onClose} autoHideDuration={4000}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={status}
          onClose={onClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'warning', 'error', 'info', '']).isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

CustomizedSnackbars.defaultProps = {
  onClose: () => {},
};

export default class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      status: '',
    };
  }

  openSnackBar = (message, status) => {
    this.setState(
      {
        open: true,
        message,
        status,
      },
    );
  }

  closeSnackBar = () => {
    this.setState({ open: false });
  };

  render() {
    const { children } = this.props;
    const { message, status, open } = this.state;

    return (
      <>
        <SnackBarContext.Provider value={this.openSnackBar}>
          {children}
        </SnackBarContext.Provider>
        <CustomizedSnackbars
          message={message}
          status={status}
          open={open}
          onClose={this.closeSnackBar}
        />
      </>
    );
  }
}

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

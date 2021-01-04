import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      &#169;Successive Technologies
    </div>
  );
}

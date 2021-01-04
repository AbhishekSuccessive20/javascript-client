import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    marginLeft: '30px',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button color="inherit">TRAINEE</Button>
           &nbsp;
          <Button color="inherit">TEXTFIELD DEMO</Button>
           &nbsp;
          <Button color="inherit">INPUT DEMO</Button>
           &nbsp;
          <Button color="inherit">CHILDREN DEMO</Button>
          <Button color="inherit" className={classes.margin}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

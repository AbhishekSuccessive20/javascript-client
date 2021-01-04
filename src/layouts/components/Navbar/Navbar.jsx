import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Button, Link,
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

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
          <Link component={RouterLink} to="/" color="inherit">
            <Button color="inherit">TRAINEE</Button>
          </Link>
          <Link component={RouterLink} to="/text-field" color="inherit">
            <Button color="inherit">TEXT FIELD DEMO</Button>
          </Link>
          <Link component={RouterLink} to="/input-demo" color="inherit">
            <Button color="inherit">INPUT DEMO</Button>
          </Link>
          <Link component={RouterLink} to="/children-demo" color="inherit">
            <Button color="inherit">CHILDREN DEMO</Button>
          </Link>
          <Button color="inherit" className={classes.margin}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

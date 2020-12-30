import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '60px',
    marginTop: '30px',
    fontWeight: '200',
    fontFamily: '',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: '20px',
    marginTop: '10px',
    textAlign: 'center',
    color: 'Grey',
  },
}));

export default function NoMatch() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.heading}>
        Not Found
      </div>
      <div className={classes.subHeading}>
        Seems like page you are looking after does not exists.
      </div>
    </>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
// error|warning|info|success
export default function SimpleAlerts({type, message}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={type || 'warning'}>{message}</Alert>
    </div>
  );
}
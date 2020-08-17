import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '22ch',
    },
  },
}))

function Form({ onSubmit, children }) {

  const formSubmit = function (e) {
    e.preventDefault()
    onSubmit()
  }

  const classes = useStyles();


  return (
    <form onSubmit={formSubmit} className={classes.root}>
      {children}
    </form>
  );
}

export default Form
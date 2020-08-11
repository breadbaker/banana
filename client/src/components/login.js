import React, { useState } from 'react'
import Input from 'components/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import Submit from 'components/submit'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

function Login({ actions }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = function (e) {
    e.preventDefault()
    actions.login({
      email,
      password
    })
  }

  const classes = useStyles();


  return (
    <form onSubmit={submit} className={classes.root}>
      <h1>Login</h1>
      <Input
        label='email'
        value={email}
        type='email'
        update={setEmail} />
      <Input
        label='Password'
        value={password}
        type="password"
        update={setPassword} />
      <Submit />
    </form>
  );
}
  
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
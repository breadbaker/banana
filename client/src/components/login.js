import React, { useState } from 'react'
import Input from 'components/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
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


  return (
    <form onSubmit={submit}>
      <h1>Login</h1>
      <Input
        label='email'
        value={email}
        update={setEmail} />
      <Input
        label='Password'
        value={password}
        type="password"
        update={setPassword} />
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
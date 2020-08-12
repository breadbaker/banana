import React, { useState } from 'react'
import Input from 'components/input'
import Form from 'components/form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import Submit from 'components/submit'

function Login({ actions }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = function (e) {
    actions.login({
      email,
      password
    })
  }

  return (
    <Form onSubmit={submit}>
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
      <Submit label="Log In" />
    </Form>
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
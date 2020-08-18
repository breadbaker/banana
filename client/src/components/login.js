import React, { useState } from 'react'
import Input from 'components/input'
import Form from 'components/form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import Submit from 'components/submit'
import Alert from 'components/alert'
function Login({ actions, state }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async function (e) {
    const result = await actions.login({
      email,
      password
    })

    if (result) {
      setError(result)
    }
  }

  return (
    <Form onSubmit={submit}>
      <Input
        label='Email'
        value={email}
        type='email'
        update={setEmail} />
      <Input
        label='Password'
        value={password}
        type="password"
        update={setPassword} />
      <Submit label="Log In" />
      {
        error &&
        <Alert type="warning" message={error} />
      }
    </Form>
  );
}
  
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
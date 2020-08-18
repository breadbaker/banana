import React, { useState } from 'react'
import Submit from 'components/submit'
import Input from 'components/input'
import Form from 'components/form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Alert from 'components/alert'
import Actions from 'actions'
function Signup({ actions, state }) {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async function (e) {
    const result = await actions.signup({
      email,
      firstName,
      lastName,
      password
    })

    if (result) {
      setError(result)  
    }
  }


  return (
    <Form onSubmit={submit}>
      <Input
        label='First Name'
        value={firstName}
        update={setFirstName} />
      <Input
        label='Last Name'
        value={lastName}
        update={setLastName} />
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
      <Submit label="Sign Up" />
      { error &&
        <Alert message={error} />
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
)(Signup)
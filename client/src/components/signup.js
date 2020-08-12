import React, { useState } from 'react'
import Submit from 'components/submit'
import Input from 'components/input'
import Form from 'components/form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
function Signup({ actions }) {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const submit = function (e) {
    actions.signup({
      email,
      firstName,
      lastName,
      password
    })
  }


  return (
    <Form onSubmit={submit}>
      <Input
        label='Email'
        value={email}
        update={setEmail} />
      <Input
        label='First Name'
        value={firstName}
        update={setFirstName} />
      <Input
        label='Last Name'
        value={lastName}
        update={setLastName} />
      <Input
        label='Password'
        value={password}
        type="password"
        update={setPassword} />
      <Submit label="Sign Up" />
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
)(Signup)
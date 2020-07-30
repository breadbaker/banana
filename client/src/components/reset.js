import React, { useState } from 'react'
import Input from 'components/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
function Reset({ actions }) {

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const submit = function (e) {
    e.preventDefault()
    actions.reset({
      password,
      passwordConfirm
    })
  }


  return (
    <form onSubmit={submit}>
      <h1>Reset</h1>
      <Input
        label='Password'
        value={password}
        type="password"
        update={setPassword} />
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
)(Reset)
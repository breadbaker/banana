import React, { useState } from 'react'
import Input from 'components/input'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
function Forgot({ actions }) {

  const [email, setEmail] = useState('')

  const submit = function (e) {
    e.preventDefault()
    actions.forgot({
      email,
      password
    })
  }


  return (
    <form onSubmit={submit}>
      <h1>Forgot</h1>
      <Input
        label='email'
        value={email}
        update={setEmail} />
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
)(Forgot)
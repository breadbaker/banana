import React, { useState } from 'react'
import Input from 'components/input'
function Forgot() {

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

export default Forgot
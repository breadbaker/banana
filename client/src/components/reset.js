import React, { useState } from 'react'
import Input from 'components/input'
function Reset() {

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

export default Reset
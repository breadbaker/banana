import React, { useState } from 'react'
import Submit from 'components/submit'
import Input from 'components/input'
import Form from 'components/form'
import Alert from 'components/alert'
import Loader from 'components/loader'
import axios from 'axios'
import { saveAuth } from 'util/auth'
import getDomain from 'util/domain'
import { browserHistory } from 'react-router'
function Signup() {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const signup = async function (e) {
    setLoading(true)
    try {
      const response = await axios.post(`${getDomain()}/signup`,
        {
          email,
          firstName,
          lastName,
          password
        }
      )
      saveAuth({...response.data.AuthenticationResult, email})
      browserHistory.push('/newFlight')
    } catch (err) {
      setError('User Already Exists')
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={signup}>
      { loading && <Loader /> }
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

export default Signup
import React, { useState } from 'react'
import Input from 'components/input'
import Form from 'components/form'
import Submit from 'components/submit'
import Alert from 'components/alert'
import Loader from 'components/loader'
import axios from 'axios'
import { saveAuth } from 'util/auth'
import getDomain from 'util/domain'
import { browserHistory } from 'react-router'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async function (e) {
    setLoading(true)
    try {
      const response = await axios.post(`${getDomain()}/login`,
        {
          email,
          password
        }
      )

      saveAuth({...response.data.AuthenticationResult, email })
      browserHistory.push('/newFlight')
    } catch (err) {
      setError(`We don't recognize those credentials`)
      setLoading(false)
    }
  }

  return (
    <div>
      { loading && <Loader /> }
      <Form onSubmit={login}>
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
    </div>
  );
}

export default Login
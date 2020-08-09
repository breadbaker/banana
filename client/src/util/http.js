import axios from 'axios'
import { push } from 'react-router-redux'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}

const saveAuth = data => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify(data))
  dispatch({
    ...data,
    type: 'SET_AUTH'
  })
}

export default async function({
  dispatch,
  getState,
  url,
  data,
  method
}) {
  let auth = getState().auth

  if (!auth.AccessToken) {
    dispatch(push('/welcome/login'))
  } else {

    const {
      exp
    } = jwt.decode(auth.AccessToken)

    console.log(moment(new Date(exp * 1000)).diff(moment(new Date()), 'seconds'))

    const diff = moment(new Date(exp * 1000)).diff(moment(new Date()), 'seconds')

    if (diff  < 15) {
      try {
        const renewResponse = await axios.post(`${getDomain()}/renew`, auth)
        saveAuth(renewResponse.data.AuthenticationResult)
      } catch (err) {
        dispatch(push('/welcome/login'))
      }

    }

    const {
      AccessToken,
      IdToken,
      email
    } = getState().auth

    const payload =  {
      data,
      headers: {
        AccessToken,
        IdToken,
        email
      }
    }
    console.log('url payload')
    console.log(url)
    console.log(payload)

    const response = await axios[method](`${getDomain()}${url}`, payload)

    return response
  }
  
}
import axios from 'axios'
import { push } from 'react-router-redux'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}

export default async function({
  dispatch,
  getState,
  url,
  data,
  method
}) {
  dispatch({
    type: 'SET_GLOBAL',
    loading: true
  })
  let auth = getState().auth

  if (!auth.AccessToken) {
    dispatch({
      type: 'SET_GLOBAL',
      loading: false
    })
    dispatch(push('/welcome/login'))
  } else {

    const {
      exp
    } = jwt.decode(auth.AccessToken)

    const diff = moment(new Date(exp * 1000)).diff(moment(new Date()), 'seconds')

    if (diff  < 15) {
      try {
        const renewResponse = await axios.post(`${getDomain()}/renew`, auth)
        const data = renewResponse.data.AuthenticationResult
        data.auth_time = new Date()
        const newAuth = {...auth, ...data}
        localStorage.setItem('auth', JSON.stringify(newAuth))
        dispatch({
          ...newAuth,
          type: 'SET_AUTH'
        })
      } catch (err) {
        dispatch({
          type: 'SET_GLOBAL',
          loading: false
        })
        dispatch(push('/welcome/login'))
        return
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

    const response = await axios[method](`${getDomain()}${url}`, payload)
    dispatch({
      type: 'SET_GLOBAL',
      loading: false
    })
    return response
  }
  
}
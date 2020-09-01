import axios from 'axios'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { saveAuth, getAuth } from 'util/auth'
import { browserHistory } from 'react-router'
const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}

export default function({method = 'post', data}) { 
  return async function(url) {
    let auth = getAuth()
  
    if (!auth.AccessToken) {
      browserHistory.push('/welcome/login')
      return
    }
  
    const {
      exp
    } = jwt.decode(auth.AccessToken)

    const diff = moment(new Date(exp * 1000)).diff(moment(new Date()), 'seconds')

    if (diff  < 15) {
      try {
        const renewResponse = await axios.post(`${getDomain()}/renew`, auth)
        saveAuth({
          ...auth,
          ...renewResponse.data.AuthenticationResult,
          auth_time: new Date()
        })
      } catch (err) {
      browserHistory.push('/welcome/login')
        return
      }
    }

    const {
      AccessToken,
      IdToken,
      email
    } = getAuth()

    const payload =  {
      data,
      headers: {
        AccessToken,
        IdToken,
        email
      }
    }

    const response = await axios[method](`${getDomain()}${url}`, payload)
    return response.data
  }
}
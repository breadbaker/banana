import * as types from 'constants'
import axios from 'axios'
import { push, replace } from 'react-router-redux'
import http from 'util/http'
const saveFlight = flight => (dispatch, getState) => {
  http({
    dispatch,
    getState,
    url: '/flight',
    method: 'post',
    data: flight
  }).then(() => {
    dispatch({
      flight,
      type: types.FLIGHTS_ADD
    })
  })
}

const verifyStripe = stripe_id => (dispatch, getState) => {
  http({
    dispatch,
    getState,
    url: '/billing',
    method: 'post',
    data: {
      stripe_id
    }
  }).then((response) => {
    try {
      if (response.data && response.data.action === 'redirect') {
        var stripe = Stripe(response.data.stripe_pk);
        stripe.redirectToCheckout({
          sessionId: response.data.session_id
        })
      }
    } catch (err) {
      dispatch(replace('/welcome/login'))
    }
  })
}

const updateFlight = flight => (dispatch, getState) => {
  dispatch({
    payload: flight,
    type: flight.deletedAt ? types.FLIGHTS_DELETE : types.FLIGHTS_UPDATE
  })
  http({
    dispatch,
    getState,
    url: '/flights',
    method: 'put',
    data: flight
  }).then(() => {
  })
}

const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}

const loadFlights = () => (dispatch, getState) => {
  http({
    dispatch,
    getState,
    url: '/flights',
    method: 'post'
  }).then(response => {
    if (response) {
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    }
  })
}

const signup = data => (dispatch, getState) => {
  dispatch({
    type: 'SET_GLOBAL',
    loading: true
  })
  return axios.post(`${getDomain()}/signup`,
    data)
    .then(function (response) {
      saveAuth({...response.data.AuthenticationResult, email: data.email})
      dispatch({
        ...data,
        email: data.email,
        type: 'SET_AUTH'
      })
      dispatch(push('/newFlight'))
      dispatch({
        type: 'SET_GLOBAL',
        loading: false
      })
      return null
    }).catch(err => {
      return 'User Already Exists'
    })
}

const saveAuth = data => {
  localStorage.setItem('auth', JSON.stringify(data))
}

const login = data => (dispatch, getState) => {
  dispatch({
    type: 'SET_GLOBAL',
    loading: true
  })
  return axios.post(`${getDomain()}/login`,
    data)
    .then(function (response) {
      saveAuth({...response.data.AuthenticationResult, email: data.email})
      dispatch({...response.data.AuthenticationResult, email: data.email, type: 'SET_AUTH'})
      dispatch(push('/newFlight'))
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
      dispatch({
        type: 'SET_GLOBAL',
        loading: false
      })
      return nul
    }).catch((err) => {
      return `We don't recognize those credentials`
    })
}

const logout = () => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify({}))
  dispatch(push('/welcome/login'))
}

const nav = url => (dispatch) => {
  dispatch(replace(url))
}

export default {
  saveFlight,
  loadFlights,
  updateFlight,
  signup,
  login,
  nav,
  logout,
  verifyStripe
}
import * as types from 'constants'
import { createActions } from 'redux-actions'
import axios from 'axios'
import { push } from 'react-router-redux'


const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}
const saveFlight = flight => (dispatch, getState) => {
  axios.post(`${getDomain()}/flight`,
    {
      key: 'testprod',
      data: flight
    })
    .then(function (response) {
      dispatch({
        products: response.data,
        type: types.FLIGHTS_ADD
      })
    })
}

// const pushtto = routeActions.push


const loadFlights = () => (dispatch, getState) => {
  // dispatch(push('/app'))
  axios.post(`${getDomain()}/flights`,
    {
      key: 'testprod'
    })
    .then(function (response) {
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}

const signup = data => (dispatch, getState) => {
  axios.post(`${getDomain()}/signup`,
    data)
    .then(function (response) {
      saveAuth(response.data.AuthenticationResult)
      routeActions.push('/newFlight')
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}

const saveAuth = data => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify(data))
  dispatch({
    ...data,
    type: 'SET_AUTH'
  })
}

const login = data => (dispatch, getState) => {
  axios.post(`${getDomain()}/login`,
    data)
    .then(function (response) {
      saveAuth(response.data.AuthenticationResult)
      dispatch(push('/newFlight'))
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}

export default {
  saveFlight,
  loadFlights,
  signup,
  login
}
import * as types from 'constants'
import { createActions } from 'redux-actions'
import axios from 'axios'
import { push } from 'react-router-redux'
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
const exportRecords = () => (dispatch, getState) => {
  http({
    dispatch,
    getState,
    url: '/export-records',
    method: 'post'
  }).then(response => {
    // dispatch({
    //   flights: response.data,
    //   type: types.FLIGHTS_LIST
    // })
  })
}


const getDomain = () => {
  return window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}
// const pushtto = routeActions.push


const loadFlights = () => (dispatch, getState) => {
  http({
    dispatch,
    getState,
    url: '/flights',
    method: 'post'
  }).then(response => {
    dispatch({
      flights: response.data,
      type: types.FLIGHTS_LIST
    })
  })





  // // dispatch(push('/app'))
  // axios.post(`${getDomain()}/flights`,
  //   {
  //     key: 'getState().auth.email'
  //   })
  //   .then(function (response) {

  //   })
}

const signup = data => (dispatch, getState) => {
  axios.post(`${getDomain()}/signup`,
    data)
    .then(function (response) {
      saveAuth({...response.data.AuthenticationResult, email: data.email})
      dispatch({
        ...data,
        type: 'SET_AUTH'
      })
      routeActions.push('/app/newFlight')
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}

const saveAuth = data => {
  localStorage.setItem('auth', JSON.stringify(data))
}

const login = data => (dispatch, getState) => {
  axios.post(`${getDomain()}/login`,
    data)
    .then(function (response) {
      saveAuth({...response.data.AuthenticationResult, email: data.email})
      dispatch({...response.data.AuthenticationResult, email: data.email, type: 'SET_AUTH'})
      dispatch(push('/newFlight'))
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}

const logout = () => (dispatch) => {
  localStorage.setItem('auth', JSON.stringify({}))
  dispatch(push('/welcome/login'))
}

const nav = url => (dispatch) => {
  dispatch(push(url))
}

export default {
  saveFlight,
  loadFlights,
  exportRecords,
  signup,
  login,
  nav,
  logout
}
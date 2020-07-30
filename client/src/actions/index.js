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
      routeActions.push('/newFlight')
      dispatch({
        flights: response.data,
        type: types.FLIGHTS_LIST
      })
    })
}


// const searchProducts = (ingredient) => (dispatch, getState) => {
//   axios.get(`http://localhost:3000/search?ingredient=${ingredient}`)
//     .then(function (response) {
//       dispatch({
//         products: response.data,
//         type: types.PRODUCTS_LIST
//       })
//     })
// }

export default {
  saveFlight,
  loadFlights,
  signup
}
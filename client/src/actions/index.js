import * as types from 'constants'
import { createActions } from 'redux-actions'
import axios from 'axios'


const getDomain = () => {
  return window.location.host === 'localhost' ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
}
const saveFlight = flight => (dispatch, getState) => {
  axios.post(`${getDomain()}/flight`,
    flight)
    .then(function (response) {
      dispatch({
        products: response.data,
        type: types.FLIGHTS_ADD
      })
    })
}


const loadFlights = () => (dispatch, getState) => {
  axios.get(`${getDomain()}/flights`)
    .then(function (response) {
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
  loadFlights
}
import * as types from 'constants'
import { createActions } from 'redux-actions'
import axios from 'axios'

const searchProducts = (ingredient) => (dispatch, getState) => {
  axios.get(`http://localhost:5000/search?ingredient=${ingredient}`)
    .then(function (response) {
      dispatch({
        products: response.data,
        type: types.PRODUCTS_LIST
      })
    })
}

export default {
  searchProducts
}
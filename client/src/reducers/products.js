import { PRODUCTS_LIST } from 'constants'

const initialState = {
  products: [],
}

export default function products(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LIST:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}

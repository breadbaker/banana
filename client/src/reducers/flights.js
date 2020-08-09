import { FLIGHTS_LIST, FLIGHTS_ADD } from 'constants'

const initialState = {
  flights: [],
}

export default function flights(state = initialState, action) {
  switch (action.type) {
    case FLIGHTS_LIST:
      return {
        ...state,
        flights: action.flights
      }
    case FLIGHTS_ADD:
      return {
        ...state,
        flights: [action.flight].concat(state.flights)
      }
    default:
      return state
  }
}

import { FLIGHTS_LIST, ADD_FLIGHT } from 'constants'

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
    case ADD_FLIGHT:
      return {
        ...state,
        flights: state.flights.concat(action.flight)
      }
    default:
      return state
  }
}

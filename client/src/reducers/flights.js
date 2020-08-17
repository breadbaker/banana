import {
  FLIGHTS_LIST,
  FLIGHTS_ADD,
  FLIGHTS_DELETE,
  FLIGHTS_UPDATE
 } from 'constants'

const initialState = {
  flights: [],
  totalFlightTime: 0
}

export default function flights(state = initialState, action) {
  switch (action.type) {
    case FLIGHTS_LIST:
      const flights = action.flights.sort((a,b) => {
        return new Date(b.date) - new Date(a.date)
      }).filter(flight => {
        return flight.deletedAt === undefined
      })
      return {
        ...state,
        flights,
        totalFlightTime: flights.reduce((total, flight) => {
          return total + Number(flight.durration)
        }, 0)
      }
    case FLIGHTS_ADD:
      state.flights.unshift(action.flight)
      return {
        ...state
      }
    case FLIGHTS_DELETE:
      return {
        ...state,
        flights: state.flights.filter(flight => {
          return flight.id !== action.payload.id
        })
      }
    case FLIGHTS_UPDATE:
      return {
        ...state,
        flights: state.flights.map(flight => {
          if (flight.id === action.payload.id) {
            return action.payload
          } else {
            return flight
          }
        })
      }
    default:
      return state
  }
}

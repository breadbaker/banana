import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import flights from './flights'

const authInitialState = {
  auth: [],
}
function auth(state = authInitialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...action.payload
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  flights,
  auth,
  routing: routerReducer
})

export default rootReducer

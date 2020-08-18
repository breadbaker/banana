import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import flights from './flights'

const authInitialState = {
  auth: null,
}
function auth(state = authInitialState, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...action
      }
    default:
      return state
  }
}

const globalInitialState = {
  loading: true
}
function global(state = globalInitialState, action) {
  switch (action.type) {
    case 'SET_GLOBAL':
      return {
        ...action
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  flights,
  auth,
  global,
  routing: routerReducer
})

export default rootReducer

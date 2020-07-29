import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import flights from './flights'

const rootReducer = combineReducers({
  flights,
  routing: routerReducer
})

export default rootReducer

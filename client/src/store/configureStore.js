import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'

import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, routerMiddleware(browserHistory)),
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}


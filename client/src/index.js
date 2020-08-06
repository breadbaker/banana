// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'containers/App'
import LoggedOutApp from 'containers/logged-out-app'
import configureStore from './store/configureStore'
import Actions from 'actions'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import NewFlight from 'components/newFlight'
import Flights from 'components/flights'
import Signup from 'components/signup'
import Login from 'components/login'
import Forgot from 'components/forgot'
import Reset from 'components/reset'
import { css } from 'emotion'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
//Dispatch the fetchPosts() before our root component renders
store.dispatch(Actions.loadFlights())
// store.dispatch(push('/app'))
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/app" component={App}>
          <IndexRoute component={NewFlight} />
          <Route path="flights" component={Flights}/>
          <Route path="newFlight" component={NewFlight} />
      </Route>
      <Route path="/" component={LoggedOutApp}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/reset" component={Reset}/>
        <Route path="/forgot" component={Forgot}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('root')
)

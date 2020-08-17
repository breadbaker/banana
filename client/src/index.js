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
import Export from 'components/export'
import Signup from 'components/signup'
import Login from 'components/login'
import Forgot from 'components/forgot'
import Reset from 'components/reset'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { css } from 'emotion'
import jwt from 'jsonwebtoken'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
//Dispatch the fetchPosts() before our root component renders
const auth = JSON.parse(localStorage.getItem('auth'))
if (auth) {
  console.log(jwt.decode(auth.AccessToken))
  store.dispatch({
    ...auth,
    type: 'SET_AUTH'
  })
} else {
  store.dispatch(push('/welcome/login'))
}


store.dispatch(Actions.loadFlights())
// store.dispatch(push('/flights'))
render(
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="xs">
      <Provider store={store}>
        <Router history={history}>
          <Route path="/welcome" component={LoggedOutApp}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login}/>
            <Route path="signup" component={Signup}/>
            <Route path="/reset" component={Reset}/>
            <Route path="/forgot" component={Forgot}/>
          </Route>
          <Route path="/" component={App}>
            <IndexRoute component={NewFlight} />
            <Route path="export" component={Export} />
            <Route path="flights" component={Flights}/>
            <Route path="newFlight" component={NewFlight} />
          </Route>
        </Router>
      </Provider>
    </Container>
  </React.Fragment>,
  document.getElementById('root')
)
// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'containers/App'
import configureStore from './store/configureStore'
import Actions from 'actions'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import NewFlight from 'components/newFlight'
import Flights from 'components/flights'
import { css } from 'emotion'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

//Dispatch the fetchPosts() before our root component renders
store.dispatch(Actions.loadFlights())

render(
  <Provider store={store}>
    <div
        className={css`
        padding: 12px;
        background-color: #e4e4e4;
        font-size: 14px;
        font-family: helvetica;
        font-weight: bold;
        border-radius: 4px;
        display: block;
        max-width: 500px;
        margin: 0 auto;
    `}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/oldflights" component={Flights}/>
          <Route path="/newFlight" component={NewFlight} />
          <IndexRoute component={NewFlight} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

import React from 'react'
import { render } from 'react-dom'
import App from 'containers/App'
import LoggedOutApp from 'containers/logged-out-app'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Switch } from 'react-router-dom'
import NewFlight from 'components/newFlight'
import Flights from 'components/flights'
import Endorsements from 'components/endorsements'
import NewEndorsement from 'components/new-endorsement'
import Signup from 'components/signup'
import Login from 'components/login'
import Forgot from 'components/forgot'
import Reset from 'components/reset'
import Records from 'components/records'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

render(
  <React.Fragment>
    <CssBaseline />
    <Container maxWidth="xs">
      <Router history={browserHistory}>
        <Switch>
          <Route path="/welcome" component={LoggedOutApp}>
            <IndexRoute component={Login} />
            <Route path="login" component={Login}/>
            <Route path="signup" component={Signup}/>
            <Route path="/reset" component={Reset}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="records/:user_id" component={Records}/>
          </Route>
          <Route path="/" component={App}>
            <IndexRoute component={Endorsements} />
            <Route path="newEndorsement" component={NewEndorsement} />
            <Route path="endorsements" component={Endorsements} />
            <Route path="flights" component={Flights}/>
            <Route path="newFlight" component={NewFlight} />
          </Route>
        </Switch>
      </Router>
  </Container>
  </React.Fragment>,
  document.getElementById('root')
)

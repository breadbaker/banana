// import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from 'containers/App'
import configureStore from './store/configureStore'
import Actions from 'actions'

const store = configureStore()
//Dispatch the fetchPosts() before our root component renders
store.dispatch(Actions.loadFlights())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)



// import React from "react";
// import ReactDOM from "react-dom";

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// ReactDOM.render(<Index />, document.getElementById("index"));
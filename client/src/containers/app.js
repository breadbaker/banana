import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import { useSelector, useDispatch } from "react-redux";
import NewFlight from 'components/newFlight'
import Flights from 'components/flights'
import { css } from 'emotion'

function App({ actions, flights }) {
  // const { todos, actions } = this.props
  const counter = useSelector(state => state);
  const dispatch = useDispatch();
  // const flights = useSelector()

  return (
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
    `}
    >
      <Flights flights={flights} />
      <NewFlight saveFlight={actions.saveFlight} />
    </div>
  );
}

// App.propTypes = {
//   todos: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// }

function mapStateToProps(state) {
  return {
    flights: state.flights
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

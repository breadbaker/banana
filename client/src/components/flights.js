import { css, cx } from 'emotion'
import React, { Component, PropTypes } from 'react'
import Display from 'components/display'
import Input from 'components/input'
import FlightCard from 'components/flight-card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
const color = 'white'


function Flights({ flights, actions }) {
  return (
    <div
      className={css(`
        // margin-top: -80px;
        // background: white;
      `)}>
      <h1>
        Total Flight Hours: {flights.totalFlightTime}
      </h1>
      { flights.flights.map((flight, idx) => {
        return (
          <FlightCard
            key={flight.id || idx}
            flight={flight} 
            updateFlight={actions.updateFlight}
          />
          )
      })}
    </div>
  )
}


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
)(Flights)

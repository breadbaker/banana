import { css, cx } from 'emotion'
import React, { Component, PropTypes } from 'react'
import Display from 'components/display'
import DisplaySignature from 'components/displaySignature'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
const color = 'white'


function Flights({ flights }) {
  return (
    <div>
      { flights.flights.map(flight => {
        return (
          <div key={flight.id}>
            <Display
              label='Aircraft'
              value={flight.aircraft}
            />
            <Display
              label='Date'
              value={flight.date}
              type='date'
            />
            <Display
              label='Departing Airport'
              value={flight.departingAirport}
            />
            <Display
              label='Arriving Airport'
              value={flight.arrivalAirport}
            />
            <Display
              label='Durration'
              value={flight.durration}
              type='number'
            />
            <Display
              label='Takeoffs'
              value={flight.takeoffs}
              type='number'
            />
            <Display
              label='Landings'
              value={flight.landings}
              type='number'
            /> 
            <Display
              label='Remarks'
              value={flight.remarks}
            />
            <DisplaySignature
              signature={flight.signature}
            />
          </div>
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


export default connect(
  mapStateToProps
)(Flights)

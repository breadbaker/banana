



import React, { Component, PropTypes, useRef, useState } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
function Header({ actions }) {

  return (
    <header>
        Links:
        {' '}
        <Link to="/newFlight">New Flight</Link>
        {' '}
        <Link to="/oldFlights">Past Flights</Link>
        {' '}
    </header>
  );
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
)(Header)
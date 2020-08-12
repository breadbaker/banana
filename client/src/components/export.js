import { css, cx } from 'emotion'
import React, { Component, PropTypes } from 'react'
import Display from 'components/display'
import Input from 'components/input'
import FlightCard from 'components/flight-card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
const color = 'white'


function Export({ auth }) {
  return (
    <div
      className={css(`
        margin-left: -23px;
        // background: white;
      `)}>
      <img src={`https://flightlogboxuserrecords.s3.amazonaws.com/${encodeURIComponent(auth.email)}export.png`} />
    </div>
  )
}


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export)

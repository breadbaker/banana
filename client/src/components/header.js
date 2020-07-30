



import React, { Component, PropTypes, useRef, useState } from 'react'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import { css } from 'emotion'

function Header({ actions, links }) {

  return (
    <header>
        {links.map((link, idx) => {
          return (
            <div
              key={idx}
              className={css`
                display: inline-block;
                margin: 5px;
              `}>
              <Link key={idx} to={link.link}>{link.label}</Link>
            </div>
          )
        })}
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
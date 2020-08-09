import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from 'actions'

import { css } from 'emotion'
import Header from 'components/header'

function App({children}) {
  return (
    <div
    >
      <Header links={[
        {
          label: 'New Flight',
          link: '/newFlight'
        },
        {
          label: 'Past Flights',
          link: '/flights'
        }
      ]}/>
      {children}
    </div>
  );
}

export default App
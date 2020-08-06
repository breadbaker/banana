import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from 'actions'

import { css } from 'emotion'
import Header from 'components/header'

function App({children}) {
  return (
    <div
      className={css`
        padding: 20px;
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
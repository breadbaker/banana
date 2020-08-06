import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from 'actions'

import { css } from 'emotion'
import Header from 'components/header'

function LoggedOutApp({children}) {
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
      <Header links={[
        {
          label: 'Login',
          link: '/welcome/login'
        },
        {
          label: 'Signup',
          link: '/welcome/signup'
        },
        {
          label: 'Forgot',
          link: '/welcome/forgot'
        }
      ]}/>
      <div>
        <h1>Flight Log Box</h1>
        <p>Flight logging tool for students, and with signatures for instructiors</p>
      </div>
      {children}
    </div>
  );
}

export default LoggedOutApp
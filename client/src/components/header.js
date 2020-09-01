



import React, { Component, PropTypes, useRef, useState } from 'react'
import { Link } from 'react-router'

import { css } from 'emotion'

function Header({ links }) {

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

export default Header
import React from 'react'
import { css } from 'emotion'

function Submit({ label }) {
  return (
    <input
      className={css`
        background-color: #141420;
        border-radius: 7px;
        color: white;
        display: block;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 16px;
        :hover {
          color: black;
          background-color: #b3b3cd;
        }
        :active {
          background-color: #4f4f64;
        };
      ` }
      type="submit"
      value={label || 'Save'} />
  )
}

export default Submit
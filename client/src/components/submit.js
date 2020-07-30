import React from 'react'
import { css } from 'emotion'

function Submit() {
  return (
    <input
      className={css`
        background-color: blue;
        border-radius: 7px;
        color: white;
        display: block;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 16px;
        :active {
          background-color: yellow;
        };
      ` }
      type="submit"
      value="Save" />
  )
}

export default Submit
import { css, cx } from 'emotion'
import React, { Component, PropTypes } from 'react'

const color = 'white'


function ProductList({products}) {
  return (
    <div>
      { products.products.map(product => {
        return <p>{product.name}</p>
      })}
      <div
        className={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>
    </div>
  )
}

export default ProductList


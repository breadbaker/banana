import React, { Component, PropTypes } from 'react'

function SearchForm(searchProducts) {

  const search = function (e) {
    e.preventDefault()
    searchProducts.searchProducts('Organic Banana')
  }
  return (
    <form onSubmit={search}>
      <label>
        ingredient:
        <input type="text"/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default SearchForm
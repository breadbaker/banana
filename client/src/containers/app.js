import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import { useSelector, useDispatch } from "react-redux";
import ProductList from 'components/productList'
import SearchForm from 'components/searchForm'

function App({ actions, products }) {
  // const { todos, actions } = this.props
  const counter = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <SearchForm searchProducts={actions.searchProducts} />
      <ProductList products={products}/>
    </div>
  );
}

// App.propTypes = {
//   todos: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired
// }

function mapStateToProps(state) {
  return {
    products: state.products
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
)(App)

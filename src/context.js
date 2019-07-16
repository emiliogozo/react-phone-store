import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: []
  }

  componentDidMount() {
    this.setProducts()
  }

  setProducts = () => {
    let products = []
    storeProducts.forEach(item => {
      const singleItem = {...item}
      products = [...products, singleItem]
    })
    this.setState({ products })
  }

  getItem = id => this.state.products.find(item => item.id === id)

  handleDetail = id => {
    const detailProduct = this.getItem(id)
    this.setState({ detailProduct })
  }

  addToCart = id => {
    let tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getItem(id))
    const product = tempProducts[index]
    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price

    this.setState({
      products: tempProducts,
      cart: [...this.state.cart, product]
    })
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}

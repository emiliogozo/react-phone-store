import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
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
    }, () => this.addTotals())
  }

  openModal = id => {
    const modalProduct = this.getItem(id)
    this.setState({
      modalProduct,
      modalOpen: true
    })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  increment = id => {
    console.log('this is the increment method')
  }

  decrement = id => {
    console.log('this is the decrement method')
  }

  removeItem = id => {
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]

    tempCart = tempCart.filter(item => item.id !== id)

    const index = tempProducts.indexOf(this.getItem(id))
    let removedProduct = tempProducts[index]
    removedProduct.inCart = false
    removedProduct.count = 0
    removedProduct.total = 0

    this.setState({
      cart: [...tempCart],
      products: [...tempProducts]
    }, () => this.addTotals())
  }

  clearCart = () => {
    this.setState(
      { cart: [] },
      () => {
        this.setProducts()
        this.addTotals()
      }
    )
  }

  addTotals = () => {
    let subtotal = 0
    this.state.cart.map(item => subtotal += item.total)
    const tempTax = subtotal * 0.1
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subtotal + tax
    this.setState({
      cartSubtotal: subtotal,
      cartTax: tax,
      cartTotal: total
    })
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}

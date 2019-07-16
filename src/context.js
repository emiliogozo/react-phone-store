import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct
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

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal

      }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer

export {ProductProvider, ProductConsumer}

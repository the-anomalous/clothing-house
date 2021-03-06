import React from 'react'

import './checkout-item.styles.scss'

import {
  removeItemFromCart,
  addItemToCart,
  clearItem
} from '../../redux/cart/cart-actions'

import { connect } from 'react-redux'

const CheckoutItem = ({ cartItem, removeItem, clearItem, addItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <div className='checkout-item'>
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={() => clearItem(cartItem)}>&#10094;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItem(cartItem)}>&#10095;</span>
      </span>
      <span className="price">₹{price * 20}</span>
      <span className="remove-button" onClick={() => removeItem(cartItem)}><i className="fas fa-trash"></i></span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeItem: cartItem => dispatch(removeItemFromCart(cartItem)),
  addItem: cartItem => dispatch(addItemToCart(cartItem)),
  clearItem: cartItem => dispatch(clearItem(cartItem))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
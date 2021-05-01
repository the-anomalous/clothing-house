import React from 'react'
import axios from 'axios'

import StripeCheckout from 'react-stripe-checkout';

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectCurrentUser } from '../../redux/user/user-selectors'

import { paymentUnsuccessful, paymentSuccessful } from '../../redux/checkout/checkout.actions'

const StripButton = ({ price, onPaymentUnsuccessful, onPaymentSuccessful, currentUser }) => {
  const priceForStripe = price * 100,
    publishableKey = 'pk_test_51Ic7g0SHtgDZBOhuTLT6OOtFcEwQyjYvCqVCImWPE3z7atqL9MgcQ7UZuZHZ1ahgQtyYwIF6p55We4Mg5dwaGWzN00hWaEdhE7'
  
  const onToken = token => {
    currentUser ? (
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      onPaymentSuccessful(true);
      setTimeout(() => onPaymentSuccessful(null), 2000);
    }).catch(error => {
      onPaymentUnsuccessful(false)
    })) : (
        onPaymentUnsuccessful(false)
    )
  }

  return (
    <StripeCheckout
    name='Clothing House Ltd.'
    description={`Your total is ₹${price}`}
    label='Proceed to Pay'
    image='https://svgshare.com/i/CUz.svg'
    shippingAddress
    billingAddress 
    amount={priceForStripe}
    currency='INR'
    token={onToken}
    panelLabel={`Pay Now`}
    stripeKey={publishableKey}
    />     
  )
}

const mapDispatchToProps = dispatch => ({
  onPaymentSuccessful: status => dispatch(paymentSuccessful(status)),
  onPaymentUnsuccessful: status => dispatch(paymentUnsuccessful(status))
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(StripButton)
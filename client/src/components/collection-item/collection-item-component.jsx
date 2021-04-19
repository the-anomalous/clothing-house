import "./collection-item.styles.scss";
import CustomButton from '../custom-button/custom-button-component'

import {addItemToCart} from '../../redux/cart/cart-actions'

import { connect } from 'react-redux'

const CollectionItem = ({ item, addItem }) => {
const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className="price">₹{price * 20}</span>
      </div>
      <CustomButton collectionBtn onClick={() => addItem(item)}>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItemToCart(item))
})


export default connect(null, mapDispatchToProps)(CollectionItem)
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import productService from '../../Service/productService';
import authService from '../../redux/features/auth/authService';
import Loader from "../../components/loader/Loader"
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/features/auth/authSlice';
import './Cart.scss'; // Import the SCSS file

function Cart() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    setLoading(true);
    authService.removeProductFromCart( {id} )
      .then( (response) => {
        dispatch(getUser());
      })
      .catch( (error) => {
        console.log(error);
      })
    setLoading(false);
  };
  
  useEffect(() => {
    setLoading(true);
    productService.getCartProducts()
      .then((response) => {
        setProducts(response);
        let total = 0;
        response.forEach((item) => {
          total += item.product.price * item.quantity;
        });
        setTotalPrice(total);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [user]);


  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-items">
        { (loading || isLoading) && <Loader/>}
        {products?.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div>
            {products.map((item) => (
                <div key={item?.product?._id} className="cart-item">
                  <img src={item?.product?.productPhoto} alt={item?.product?.name} className="cart-product-image" />
                    <div className="cart-product-details">
                      <p className="cart-product-name">{item?.product?.name}</p>
                      <p className="cart-product-price">Rs. {item?.product?.price}</p>
                      <p className="cart-product-quantity">Quantity: {item?.quantity}</p>
                      <p className="cart-item-total">Item Total: Rs.{item?.product?.price * item?.quantity}</p>
                      <button onClick={() => removeFromCart(item.product._id)} className="cart-remove-button">Remove</button>
                    </div>
                </div>
            ))}
            <p className="cart-total-price">Total Price: Rs.{totalPrice}</p>
            <button className="cart-checkout-button">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

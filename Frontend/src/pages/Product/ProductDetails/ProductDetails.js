import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import currentProductService from '../../../Service/productService';
import Loader from "../../../components/loader/Loader";
import productService from '../../../Service/productService';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/features/auth/authSlice';
import './ProductDetails.scss'; // Import the SCSS file

function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { product_id } = useParams();
  const [error, setError] = useState(null);
  const dispatch=useDispatch();

  useEffect(() => {
    setLoading(true);
    currentProductService.getProduct(product_id)
      .then(response => {
        console.log(response);
        setCurrentProduct(response);
      })
      .catch(error => {
        console.log(error);
        setError("Error fetching product details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [product_id]);

  const handleAddToCart = () => {
    setLoading(true);
    productService.addProductToCart(product_id,quantity)
      .then(() => {
        dispatch(getUser);
      })
      .catch( error => {
        console.log(error);
      })
    setLoading(false);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= currentProduct?.quantity) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-details-container">
      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      {currentProduct && (
        <>
          <div className="product-details">
            <div className="product-image-container">
              <img src={currentProduct.productPhoto} alt={currentProduct.name} className="product-image" />
            </div>
            <div className="product-details-right">
              <h2 className="product-name">{currentProduct.name}</h2>
              <p className="product-description">{currentProduct.description}</p>
              <p className="product-price">Rs.{currentProduct.price}</p>
              <p className="product-stock">Stock : {currentProduct.quantity}</p>
              <label className="product-quantity-label">
                Quantity :
                <input type="number" min={1} max={currentProduct.quantity} value={quantity} onChange={handleQuantityChange} className="product-quantity-input" />
              </label>
              <button onClick={handleAddToCart} disabled={loading || quantity <= 0 || quantity > currentProduct.quantity} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;

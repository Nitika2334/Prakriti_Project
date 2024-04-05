import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader/Loader';
import productService from '../../../Service/productService';
import authService from '../../../redux/features/auth/authService';
import { getUser } from '../../../redux/features/auth/authSlice';
import './ProductDetails.scss'; // Import the SCSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function ProductDetails() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { product_id } = useParams();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  console.log(user);

  useEffect(() => {
    setLoading(true);
    productService.getProduct(product_id)
      .then((response) => {
        setCurrentProduct(response);
      })
      .catch((error) => {
        console.log(error);
        setError('Error fetching product details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [product_id, user]);

  const handleAddToCart = () => {
    if (currentProduct.quantity < quantity) {
      toast.error('Not enough stock left');
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please put a valid quantity...');
      return;
    }
    if(!user){
      navigate('/login');
    }
    
    setLoading(true);
    authService
      .addProductToCart(product_id, { quantity })
      .then((response) => {
        dispatch(getUser());
        toast.success("Product has been added to the cart");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = () => {
    setLoading(true);
    productService.deleteProduct(currentProduct._id)
      .then( () => {
        toast.success("Product has been deleted successfully");
        navigate('/show-products');
      })
      .catch( (error) => {
        console.log(error);
      })
    setLoading(false);
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  return (
    <div className="product-details-container">
      { (loading || isLoading) && <Loader />}
      {error && <p className="error-message">{error}</p>}
      {currentProduct && (
        <>
          <div className="product-details">
            <div className="product-image-container">
              <img
                src={currentProduct.productPhoto}
                alt={currentProduct.name}
                className="product-image"
              />
            </div>
            <div className="product-details-right">
              <h2 className="product-name">{currentProduct.name}</h2>
              <p className="product-description">
                {currentProduct.description}
              </p>
              <p className="product-price">Rs.{currentProduct.price}</p>
              <p className="product-stock">Stock : {currentProduct.quantity}</p>

              {user?.role === 'admin' ? 
                (
                  <div className="Buttons">
                    <button onClick={ () => navigate(`/update-product/${currentProduct._id}`)} className="update-button">Update</button>
                    <button onClick={handleDeleteProduct} className="delete-button">Delete</button>
                  </div>
                )
                :
                currentProduct.quantity >=1 ?
                  (
                    <>
                      <label className="product-quantity-label">
                        Quantity :
                        <input
                          type="number"
                          min={1}
                          max={currentProduct.quantity}
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="product-quantity-input"
                        />
                      </label>
                      <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="add-to-cart-button"
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <p className="error-message">Not in stock</p>
                  )
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;





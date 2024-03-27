import React, { useState, useEffect } from 'react';
import productService from '../../Service/productService';
import Loader from "../../components/loader/Loader"
import { Link } from 'react-router-dom';
import "./Shop.scss"

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="product-card">
        <div className="product-details">
          <h3>{product.name}</h3>
          <img src={product.productPhoto} alt={product.name} />
          <ul>
            <li>Rs.{product.price}</li>
            <li>Category: {product.category}</li>
            <li>Quantity: {product.quantity}</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    // Fetch products from backend
    setLoading(true);
    productService.getProducts()
      .then(response => {
        setLoading(false);
        setProducts(response);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array means this effect will run only once, similar to componentDidMount

  return (
    <div>
      {loading && <Loader/>}
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
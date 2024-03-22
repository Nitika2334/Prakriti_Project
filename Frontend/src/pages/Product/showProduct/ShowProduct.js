import React, { useState, useEffect } from 'react';
import productService from '../../../Service/productService';
import Loader from "../../../components/loader/Loader"
import { Link } from 'react-router-dom';

import "./ShowProduct.scss"

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="product-card">
        <img src={product.productPhoto} alt={product.name} />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Rs.{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

function ShowProduct() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    productService.getAdminProducts()
      .then(response => {
        setLoading(false);
        setProducts(response);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }, []); 

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

export default ShowProduct

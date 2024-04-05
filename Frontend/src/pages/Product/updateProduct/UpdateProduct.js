import React, { useState, useEffect } from 'react';
import Loader from '../../../components/loader/Loader';
import productService from '../../../Service/productService';
import Card from '../../../components/card/Card';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/features/auth/authSlice';
import './UpdateProduct.scss';


const upload_preset = `${process.env.REACT_APP_UPLOAD_PRESET}`;
const cloud_name = `${process.env.REACT_APP_CLOUD_NAME}`;
const url = 'https://api.cloudinary.com/v1_1/dhhnvmoz0/image/upload';

const UpdateProduct = () => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    productPhoto: "",
    category: "",
    quantity: 0,
  };

  const { isLoading } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(initialState); 
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [samePhoto, setSamePhoto] = useState(true);
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    productService.getProduct(product_id)
      .then((response) => {
        setProduct(response);
        setImagePreview(response.productPhoto); // Set image preview to initial product photo
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to fetch product data...');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [product_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSamePhoto(false);
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        productImage !== null &&
        (productImage.type === 'image/jpeg' ||
          productImage.type === 'image/jpg' ||
          productImage.type === 'image/png')
      ) {
        const data = new FormData();
        data.append('file', productImage);
        data.append('upload_preset', upload_preset);
        data.append('cloud_name', cloud_name);

        // Save image to cloudinary
        const response = await fetch(url, { method: 'post', body: data });
        const imgData = await response.json();
        setProduct({ ...product, productPhoto: imgData.url }); // Update product photo URL
        setSamePhoto(true);
        toast.success("Photo updated succesfully");
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload product photo...');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      productService.updateProduct(product_id , product)
        .then( () => {
          dispatch(getUser());
          navigate(`/product-details/${product_id}`)
          toast.success('Product updated successfully!');
        })
        .catch( error => {
          toast.error(error);
        })
    } catch (error) {
      console.log(error);
      toast.error('Failed to update product...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {(isLoading || loading) && <Loader />}
      <div className="container">
        <h2>Update Product</h2>
        <div className="--flex-start profile">
        <Card cardClass={'card'}>
            <div className="profile-photo">
              <div>
                <img
                  src={imagePreview === null ? productImage : imagePreview}
                  alt="product"
                />
                {imagePreview !== null  && !samePhoto && (
                  <div className="--center-all">
                    <button
                      className="--btn --btn-secondary"
                      onClick={savePhoto}
                    >
                      <AiOutlineCloudUpload size={18} />
                      Upload photo
                    </button>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <p>
                <label>Change Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="productImage"
                  onChange={handleImageChange}
                />
              </p>
              <p>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  disabled // Disable the input field
                />
              </p>
              <p>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  min={1}
                  value={product.price}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  disabled
                />
              </p>
              <p>
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  value={product.quantity}
                  onChange={handleInputChange}
                />
              </p>
              <button type="submit" className="--btn --btn-primary --btn-block">
                Update Product
              </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;

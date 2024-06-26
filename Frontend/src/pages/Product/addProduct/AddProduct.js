import React, { useState } from 'react';
import Loader from '../../../components/loader/Loader';
import productService from '../../../Service/productService';
import Card from '../../../components/card/Card';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AddProduct.scss';

const upload_preset = `${process.env.REACT_APP_UPLOAD_PRESET}`;
const cloud_name = `${process.env.REACT_APP_CLOUD_NAME}`;
const url = 'https://api.cloudinary.com/v1_1/dhhnvmoz0/image/upload';

const initialState = {
  name: '',
  description: '',
  price: 0,
  category: 'plant',
  quantity: 0,
  userRef: '',
  productPhoto: '',
};

const AddProduct = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [samePhoto, setSamePhoto] = useState(false);
  const [photoUpload, setPhotoUpload] = useState(false);
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setSamePhoto(false);
    setPhotoUpload(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageURL;
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

        //saving img to cloudinary
        const response = await fetch(url, { method: 'post', body: data });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }
      product.productPhoto = imageURL;
      setLoading(false);
      setSamePhoto(true);
      setPhotoUpload(true);
      toast.success("product image uploaded successfully");
    } catch (error) {
      setLoading(false);
      toast.error('Failed to upload product photo...');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      product.price = +product.price;
      product.quantity = +product.quantity;
      product.userRef = user._id;

      if (photoUpload) {
        productService.createProduct(product)
          .then( (response) => {
            toast.success('Product added succesfully!');
            const id = response._id;
            navigate(`/product-details/${id}`)
          })
          .catch((error) => {
            toast.error(error);
          });
      } else {
        toast.error('Please upload the photo first...');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      { (isLoading || loading) && <Loader />}
      <div className="container">
        <h2>Add Product</h2>
        <div className="--flex-start profile">
          <Card cardClass={'card'}>
            <div className="profile-photo">
              <div>
                <img
                  src={imagePreview === null ? productImage : imagePreview}
                  alt="product"
                />
                {imagePreview !== null && !samePhoto && (
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
                  accept="image/png, image/jpeg, image/jpg"
                  name="productImage"
                  required
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
                  required
                />
              </p>
              <p>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  required
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
                  required
                />
              </p>
              <p>
                <label>Category:</label>
                <select
                  required
                  onChange={handleInputChange}
                  name="category"
                  value={product.category}
                >
                  <option value="plant">Plant</option>
                  <option value="accessories">Accessories</option>
                </select>
              </p>
              <p>
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  value={product.quantity}
                  onChange={handleInputChange}
                  required
                />
              </p>

              <button type="submit" className="--btn --btn-primary --btn-block">
                Add Product
              </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
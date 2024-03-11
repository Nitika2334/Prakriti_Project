import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export const API_URL = `${BACKEND_URL}/api/products/`;

const createProduct = async (productData) => {
    const response = await axios.post(API_URL + "createProduct" , productData, {
      withCredentials: true,
    });
    return response.data;
  };

const updateProductPhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updateProductPhoto" ,userData);
  return response.data;
};


const productService={
    createProduct,
    updateProductPhoto
}

export default productService;
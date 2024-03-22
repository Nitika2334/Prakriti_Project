import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export const API_URL = `${BACKEND_URL}/api/products/`;

const createProduct = async (productData) => {
    const response = await axios.post(API_URL + "create-product" , productData);
    return response.data;
  };

const updateProductPhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updateProductPhoto" ,userData);
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
}

const getPlantData = async () => {
  const response = await axios.get(API_URL + "get/plant-data");
  return response.data;
}

const getAccessories = async () => {
  const response = await axios.get(API_URL + "get/accessory-data");
  return response.data;
}

const getAdminProducts = async () => {
  const response = await axios.get(API_URL + "get/admin-products");
  return response.data;
}

const addProductToCart = async (id,quantity) => {
  const response = await axios.post(API_URL + `add-to-cart/${id}`,quantity)
  return response.data;
}


const productService={
    createProduct,
    updateProductPhoto,
    getProducts,
    getProduct,
    getPlantData,
    getAccessories,
    getAdminProducts,
    addProductToCart
}

export default productService;
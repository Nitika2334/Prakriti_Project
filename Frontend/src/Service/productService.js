import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export const API_URL = `${BACKEND_URL}/api/products/`;

const createProduct = async (productData) => {
    console.log(productData);
    const response = await axios.post(API_URL + "create-product" , productData, {
      withCredentials: true,
    });
    return response.data;
  };

const updateProductPhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updateProductPhoto" ,userData);
  return response.data;
};

const getProducts=async()=>{
  const response=await axios.get(API_URL);
  return response.data;
}

const getPlantData=async()=>{
  const response=await axios.get(API_URL,{category:"plant"});
  return response.data;
}

const getAccessories=async()=>{
  const response=await axios.get(API_URL,{category:"accessories"});
  return response.data;
}


const productService={
    createProduct,
    updateProductPhoto,
    getProducts,
    getPlantData,
    getAccessories
}

export default productService;
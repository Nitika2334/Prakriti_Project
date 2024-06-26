import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

// Get login status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

// Get user
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// Get update user
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser" ,userData);
  return response.data;
};

// Get update photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatePhoto" ,userData);
  return response.data;
};

// add to product cart 

const addProductToCart = async (id,quantity) => {
  console.log(id+" "+quantity);
  const response = await axios.post(API_URL + `add-to-cart/${id}` ,quantity)
  return response.data;
}

const removeProductFromCart = async (id) => {
  const response = await axios.patch(API_URL + "/remove-cart-product",id)
  return response.data;
}


const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
  addProductToCart,
  removeProductFromCart
};

export default authService;
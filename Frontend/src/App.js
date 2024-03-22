import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/home/auth/Login";
import Register from "./pages/home/auth/Register";
import Shop from "./pages/shop/Shop";
import AddProduct from "./pages/Product/addProduct/AddProduct";
import ShowProduct from "./pages/Product/showProduct/ShowProduct"
import Profile from "./pages/profile/Profile";
import ProductDetails from "./pages/Product/ProductDetails/ProductDetails"
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  axios.defaults.withCredentials=true;
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getLoginStatus)
  },[dispatch])

  return (
    <BrowserRouter>
    <ToastContainer/>
      <Header />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/show-products" element={<ShowProduct/>}/>
        <Route path="/product-details/:product_id" element={<ProductDetails/>}/>
      </Routes>

      <Footer/>      
    </BrowserRouter>
  );
};

export default App;




import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/home/auth/Login";
import Register from "./pages/home/auth/Register";



const App = () => {
  return (
    <BrowserRouter>
      <Header />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>
      
    </BrowserRouter>
  );
};

export default App;


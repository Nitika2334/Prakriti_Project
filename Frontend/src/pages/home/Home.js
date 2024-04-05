import React , {useState, useEffect} from 'react';
import Slider from '../../components/slider/Slider';
import './HomeStyles.scss';
import CarouselItem from "../../components/corousel/CarouselItem"
import ProductCarousel from '../../components/corousel/Carousel';
import FooterLinks from '../../components/footer/FooterLinks';
import productService from '../../Service/productService';
import Loader from "../../components/loader/Loader"
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const PageHeading = ({ heading, btnText }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button onClick={() => navigate('/shop')} className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const {user,isLoading}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const [plantProducts,setPlantProducts]=useState([]);
  const [accessoryProducts,setAccessoryProducts]=useState([]);
  const [adminProducts,setAdminProducts]=useState([]);
  

  useEffect(()=>{
    setLoading(true);
    productService.getPlantData()
      .then(response => {
        setPlantProducts(response);
      })
      .catch(error =>{
        console.log(error);
      })
    setLoading(false);
  },[user])

  useEffect(()=>{
    setLoading(true);
    productService.getAccessories()
      .then(response => {
        setAccessoryProducts(response);
      })
      .catch(error =>{
        console.log(error);
      })
    setLoading(false);
  },[]);

  useEffect(()=>{
    setLoading(true);
    productService.getAdminProducts()
      .then(response => {
        console.log(response);
        setAdminProducts(response);
      })
      .catch(error =>{
        console.log(error);
      })
    setLoading(false);
  },[]);
  

  const plant = plantProducts.map((item) => (
    <div key={item._id}>
      <CarouselItem
      id={item._id}
      name={item.name}
      stock={item.quantity}
      url={item.productPhoto}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  const accessories=accessoryProducts.map((item) => (
    <div key={item._id}>
      <CarouselItem
      id={item._id}
      name={item.name}
      stock={item.quantity}
      url={item.productPhoto}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  const products=adminProducts.map((item) => (
    <div key={item._id}>
      <CarouselItem
      id={item._id}
      name={item.name}
      stock={item.quantity}
      url={item.productPhoto}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  

  return (
    <>
    <Slider/>
    {loading && <Loader/>}
    {isLoading ? <Loader/> 
      :
      <>
        {user?.role==="admin" ? 
        <section>
          <div className="container">
            <PageHeading heading={"Your Products"} btnText={"Add New"}/>
            <ProductCarousel products={products || []}/>
          </div>
        </section>
        :
        <section>
          <div className="container">
            <PageHeading heading={"Plants"} btnText={"Shop Now"}/>
            <ProductCarousel products={plant}/>
            <PageHeading heading={"Accessories"} btnText={"Shop Now"}/> 
            <ProductCarousel products={accessories}/>
          </div>
        </section>
      
      }
      </>
    }
          
      <FooterLinks/>    
    </>
  );
};

export default Home;

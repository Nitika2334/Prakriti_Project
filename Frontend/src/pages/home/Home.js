import React , {useState, useEffect} from 'react';
import Slider from '../../components/slider/Slider';
import './HomeStyles.scss';
import { productData } from '../../components/corousel/data';
import CarouselItem from "../../components/corousel/CarouselItem"
import ProductCarousel from '../../components/corousel/Carousel';
import FooterLinks from '../../components/footer/FooterLinks';
import productService from '../../Service/productService';

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const [loading,setLoading]=useState(false);
  const [plantProducts,setPlantProducts]=useState([]);
  const [accessories,setAccessories]=useState([]);

  useEffect(()=>{
    setLoading(true);
    productService.getPlantData()
      .then(response => {
        setPlantProducts(response);
        setLoading(false);
      })
      .catch(error =>{
        console.log(error);
        setLoading(false);
      })
  },[])

  useEffect(()=>{
    setLoading(true);
    productService.getAccessories()
      .then(response => {
        setAccessories(response);
        setLoading(false);
      })
      .catch(error =>{
        console.log(error);
        setLoading(false);
      })
  },[]);


  const plant = plantProducts.map((item) => (
    <div key={item._id}>
      <CarouselItem
      name={item.name}
      url={item.productPhoto}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  const itemsMap=accessories.map((item) => (
    <div key={item._id}>
      <CarouselItem
      name={item.name}
      url={item.productPhoto}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  return (
    <>
      <Slider />
      {/* <section>
        <div className="container">
          <HomeInfoBox/>
          <PageHeading heading={'Latest Products'} btnText={'Shop Now>>>'} />
          <ProductCarousel products={productss}/>
        </div>
      </section> */}
      <section>
        <div className="container">
          <PageHeading heading={"Plants"} btnText={"Shop Now"}/>
          <ProductCarousel products={plant}/>
          <PageHeading heading={"Accessories"} btnText={"Shop Now"}/> 
          <ProductCarousel products={itemsMap}/>

        </div>
      </section>
      <FooterLinks />

    
    </>
  );
};

export default Home;

import React from 'react';
import './shopStyles.scss';
import { productData } from '../../components/corousel/data';
import CarouselItem from "../../components/corousel/CarouselItem"
import ProductCarousel from '../../components/corousel/Carousel';
import ProductCategory from '../home/ProductCategory';
import Slider from '../../components/slider/Slider';

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

const Shop=()=>{
  const productss = productData.map((item, index) => (
    <div key={item.id}>
      <CarouselItem
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
      />
    </div>
  ));

  return(
    <>
    <Slider />
      <section>
        <div className="container">
          <PageHeading heading={'Latest Products'} btnText={'Shop Now>>>'} />
          <ProductCarousel products={productss}/>
        </div>
      </section>
      <section className="--bt-grey">
        <div className="container">
          <h3>
            Categories
            </h3>
            <ProductCategory/>
        </div>
      </section>
      <section>
        <div className="container">
          <PageHeading heading={"Accessories"} btnText={"Shop Now"}/>
          <ProductCarousel products={productss}/>
          <PageHeading heading={"Cacti"} btnText={"Shop Now"}/> 
          <ProductCarousel products={productss}/>

        </div>
      </section>
    </>
  )
}
export default Shop

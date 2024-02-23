import React from 'react'
import Slider from "../../components/slider/Slider"
import HomeInfoBox from './HomeInfoBox';
import "./HomeStyles.scss"
import { AiFillAccountBook } from 'react-icons/ai';

const PageHeading = ({heading,btnText}) =>{
  return (
    <>
    <div className="--flex-between">

      <h2 className="--fw-thin">
        {heading}
      </h2>

      <button className="--btn">
        {btnText}
      </button>

    </div>

    <div className="--hr">

    </div>
    </>
  )
}

const home = props => {
  return (
    <>
    <Slider/>
    <section>
      <div className="container">
        <HomeInfoBox/>
        <PageHeading heading={"Latest Products"} btnText={"Shop Now>>>"}/>

      </div>

    </section>
    </>
  )
}

home.propTypes = {

}

export default home

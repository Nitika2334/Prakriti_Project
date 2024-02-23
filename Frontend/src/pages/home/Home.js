import React from 'react'
import Slider from "../../components/slider/Slider"
import HomeInfoBox from './HomeInfoBox';
import "./HomeStyles.scss"

const home = props => {
  return (
    <>
    <Slider/>
    <section>
      <div className="container">
        <HomeInfoBox/>

      </div>

    </section>
    </>
  )
}

home.propTypes = {

}

export default home

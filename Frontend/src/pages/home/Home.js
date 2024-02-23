import React from 'react'
import Slider from "../../components/slider/Slider"
import HomeInfoBox from './HomeInfoBox';

const home = props => {
  return (
    <>
    <Slider/>
    <section>
      <div className="conatiner">
        <HomeInfoBox/>

      </div>

    </section>
    </>
  )
}

home.propTypes = {

}

export default home

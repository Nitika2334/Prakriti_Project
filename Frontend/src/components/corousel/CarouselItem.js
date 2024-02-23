import React from 'react'
import "./Carousel.scss"
import { Link } from 'react-router-dom'

const CarouselItem = ({url,name,price, description}) => {
  return (
    <div className="caraouselItem">
        <Link to ="/product-details">

            <img className="prouct--imaeg"src={url} alt="product" />

            <p className="price">
                {`$${price}`}
            </p>
            <h4>
                {name}
            </h4>
            <p className="--mb">
                {description}

            </p>
        </Link>
      
    </div>
  )
}

export default CarouselItem

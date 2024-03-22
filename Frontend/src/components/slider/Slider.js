import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Slider.scss';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from './slider-data';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  const autoScroll = true;
  const intervalTime = 5000;
  const slideIntervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, slideLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  }, [currentSlide, slideLength]);

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    const auto = () => {
      slideIntervalRef.current = setInterval(nextSlide, intervalTime);
    };
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [nextSlide, intervalTime, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? 'slide current' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <button
                    className="--btn --btn-primary"
                    onClick={()=>navigate("/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;

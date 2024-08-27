import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSlide, prevSlide, goToSlide } from '../../features/mySlider/SliderSlice'; // Adjust the import path as necessary
import style from './CustomSlider.module.scss';

const CustomSlider = () => {
  const dispatch = useDispatch();
  const { slides, currentIndex } = useSelector((state) => state.slider);

  return (
    <div className={style.customSlider}>
      <div 
        className={style.sliderWrapper} 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={style.slide}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        ))}
      </div>

      <div className={style.sliderControlsWrapper}>
        <div 
          className={`${style.sliderControl}`} 
          onClick={() => dispatch(prevSlide())}
        >
          🡠
        </div>
        
        <div className={style.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${style.dot} ${index === currentIndex ? style.active : ''}`}
              onClick={() => dispatch(goToSlide(index))}
            />
          ))}
        </div>

        <div 
          className={`${style.sliderControl}`} 
          onClick={() => dispatch(nextSlide())}
        >
         🡢
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;

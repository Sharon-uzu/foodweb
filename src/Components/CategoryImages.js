import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../Assets/Food Photo (1).png";
import img2 from "../Assets/Food Photo (2).png";
import img3 from "../Assets/Food Photo (3).png";
import img4 from "../Assets/Food Photo (4).png";
import img5 from "../Assets/chicken-curry-green-bowl-wooden-base-background_1048944-21492833.jpg";
import img6 from "../Assets/Food Photo (6).png";
import img7 from "../Assets/pepper.jpg";
import img8 from '../Assets/pasta.jpg'
import img9 from '../Assets/grill.jpg'
import img10 from '../Assets/protein.avif'


const images = [{img:img1, text: 'Snacks'}, {img:img2, text: 'Deserts'}, {img:img3, text: 'Drinks & Beverages'}, {img:img4, text: 'Rice'}, {img:img5, text: 'Soup'}, {img:img6, text: 'Ice cream'}, {img:img7, text: 'Pepper Soup'}, {img:img8, text: 'Pasta'},{img:img9, text: 'Grills & Barbecue'}, {img:img10, text: 'Proteins'} ];


const CategoryImages = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024, // Tablets
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 768, // Mobile
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 0, // Mobile
            settings: { slidesToShow: 2 },
          },
        ],
      };
    
      return (
        <div className="slider-container">
          <Slider {...settings}>
            {images.map((images, index) => (
              <div key={index} className="slide">
                <div className='s-i'>
                  <img src={images.img} alt={`Slide ${index}`} />
                  <div className="covering">
                    <h4>{images.text}</h4>
                  </div>
                </div>
                
              </div>
            ))}
          </Slider>
        </div>
      );
    };

export default CategoryImages
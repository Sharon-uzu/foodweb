import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../Assets/Food Photo (1).png";
import img2 from "../Assets/Food Photo (2).png";
import img3 from "../Assets/Food Photo (3).png";
import img4 from "../Assets/Food Photo (4).png";
import img5 from "../Assets/Food Photo (5).png";
import img6 from "../Assets/Food Photo (6).png";
import img7 from "../Assets/Food Photo.png";



const images = [img1, img2, img3, img4, img5, img6, img7];


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
            {images.map((img, index) => (
              <div key={index} className="slide">
                <img src={img} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      );
    };

export default CategoryImages
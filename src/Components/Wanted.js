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
import { IoMdStar } from "react-icons/io";



const images = [
    {
       id:1,
       text:'Blake App',
       name:'Cake',
       price:'3,500',
       img:img1
    },
    {
        id:2,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img2
     },
     {
        id:3,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img3
     },
     {
        id:4,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img4
     },
     {
        id:5,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img5
     },
     {
        id:6,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img6
     },
     {
        id:7,
        text:'Blake App',
        name:'Cake',
        price:'3,500',
        img:img3
     },
     
];

const Wanted = () => {
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
        <div className="category wanted">
            <h2>Most Wanted Meal</h2>
            <div className="slider-container">
            <Slider {...settings}>
                {images.map((images, index) => (
                <div key={index} className="slide" style={{width:'50%'}}>
                    <div className="slide-c">
                        <div className="slide-cc">
                            <img src={images.img} alt={`Slide ${index}`} />
                            <h5>{images.text}</h5>
                            <p>{images.name}</p>
                            <h4>N{images.price}</h4>
                            <div className="stars">
                                <IoMdStar className='s-i'/>
                                <IoMdStar className='s-i'/>
                                <IoMdStar className='s-i'/>
                                <IoMdStar className='s-i'/>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </Slider>
            </div>
        </div>
      );
    };

export default Wanted
import React,{useState} from "react";
import { IoMdStar } from "react-icons/io";
import f1 from "../Assets/Kilimanjaro.jpg";
import f2 from "../Assets/chiken rep.png";
import f3 from "../Assets/market suare.jpg";
import f4 from "../Assets/SHOPRITE-1-scaled.jpeg";
import f5 from "../Assets/jevinik.png";
import f6 from "../Assets/Gen restaurant.webp";

import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const vendorsList = [
  { id: 1, name: "Kilimajaro", image: f1 , link:'/categories'},
  { id: 2, name: "Chicken Republic", image: f2, link:'/categories'},
  { id: 3, name: "Market Square", image: f3, link:'/categories'},
  { id: 4, name: "Shoprite", image: f4, link:'/categories'},
  { id: 5, name: "Jevinik", image: f5, link:'/categories'},
  { id: 6, name: "Genesis", image: f6, link:'/categories'},
  
];

const Vendors = () => {

  return (
    <div className="foods" id="recommend">
      <div className="foods-c">
        {vendorsList.map((vendor) => (
          <Link style={{textDecoration:'none', color:'#000', cursor:'pointer'}} to={vendor.link} className="food" key={vendor.id}>
            <div className="food-c">
              <img src={vendor.image} alt={vendor.name} />
              <h5>{vendor.name}</h5>
              
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Vendors;

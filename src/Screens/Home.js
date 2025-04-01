import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from '../Components/Header'
import CategoryImages from '../Components/CategoryImages'
import Foods from '../Components/Foods'
import How from '../Components/How'
import Testimonial from '../Components/Testimonial'
import Footer from '../Components/Footer'
import Vendors from "../Components/Vendors";
import Typewriter from 'typewriter-effect';

const Home = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, [pathname]);


  return (
    <div>
        <Header/>
        <div className="hero">
          <div className="hero-c">
            {/* <h3><span>Fresh</span>, Locally Sourced Ingredients Make The <span>Difference</span></h3> */}
            <h3>
            <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 70,
              strings: [
                "Order in Seconds, Savor Every Moment",
                "Your Table, Your Menu, Your Way",
                "Scan, Order, and Get Served Seamlessly",
                
              ],
            }}
          />
            </h3>
            <p>No more waiting for menus or servers. With Scan Order, your dining experience starts the moment you sit down.</p>
            <a href='#recommend'><button>Get Started</button></a>
          </div>
        </div>

        <div className="category">
          <h2>Categories</h2>
          <CategoryImages/>

        </div>
      <div className="rec">
        <button>Recommended</button>
      </div>

      {/* <Foods/> */}
      <Vendors/>
      <How/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
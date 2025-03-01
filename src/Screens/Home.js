import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from '../Components/Header'
import CategoryImages from '../Components/CategoryImages'
import Foods from '../Components/Foods'
import How from '../Components/How'
import Testimonial from '../Components/Testimonial'
import Footer from '../Components/Footer'

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
            <h3><span>Fresh</span>, Locally Sourced Ingredients Make The <span>Difference</span></h3>
            <p>We bring the love of food to your table with delicious recipes, expert tips, and mouthwatering inspiration</p>
            <a href='#recommend'><button>Get Started</button></a>
          </div>
        </div>

        <div className="category">
          <h2>Our Category</h2>
          <CategoryImages/>

        </div>
      <div className="rec">
        <button>Recommended</button>
      </div>

      <Foods/>
      <How/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
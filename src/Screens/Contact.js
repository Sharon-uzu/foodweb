import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import img from '../Assets/Admin photo.png'
const Contact = () => {
  return (
    <div>
        <div className="top-contact">
            <div className="t-content">
                <Link to='/'><h5>Go Back</h5></Link>
                <h4>Contact Us</h4>
                <p>If you need any help call us, we’re here to serve you multi-dimensionally.</p>
            </div>
        </div>

        <div className="cont2">
            <div className="cont-card">
                <div className="cont-cc">
                    <h4>Our Location</h4>
                    <p>No.55,Amadi Street, Rumuagholu</p>
                </div>
            </div>

            <div className="cont-card">
                <div className="cont-cc">
                    <h4>Hot Lines</h4>
                    <p><a href="">090765847646</a>, <a href="">07099887868</a></p>
                </div>
            </div>

            <div className="cont-card">
                <div className="cont-cc">
                    <h4>Gmail</h4>
                    <p>Adam Smith22@gmail.com</p>
                </div>
            </div>

            <div className="cont-card">
                <div className="cont-cc">
                    <h4>Social Networks</h4>
                    <div className="c-icons">
                        <a href=""><AiFillInstagram className='c-i'/></a>
                        <a href=""><FaFacebookF className='c-i'/></a>
                    </div>
                </div>
            </div>

        </div>

        <div className="cont-form">
            <img src={img} alt="" />
            <form className='c-form'>
                <input type="text" placeholder='Your Name'/>
                <input type="email" placeholder='Email' />
                <textarea name="" id="" cols="30" rows="10" placeholder='Your Message'></textarea>
                <button>Send</button>
            </form>
        </div>

    </div>
  )
}

export default Contact
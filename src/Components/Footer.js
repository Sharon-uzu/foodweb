import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import logo from '../Assets/ScanOrder logo pdf.png'

const Footer = () => {
  return (
    <div className='footer'>
        <footer>
            <div className="f-img">
                <img src={logo} alt="" />

            </div>

            <div className="foot1 foot-c">
                <h3>Contact Information</h3>
                <p><a href="">Phone Number</a></p>
                <p><a href="">Company Address</a></p>
                <div className="f-footer">
                    <input type="email" placeholder='Email' />
                    <button>Subscribe</button>
                </div>
            </div>

            <div className="foot1">
                <h3>Navigation Links</h3>
                <p><Link to="/">Home</Link></p>
                <p><Link to="/categories">Menu</Link></p>
                
            </div>

            <div className="foot1">
                <h3>Social Links</h3>
                <div className="f-icons">
                    <a href=""><FaFacebookF className='f-i'/></a>
                    <a href=""><RiInstagramFill className='f-i'/></a>
                    <a href=""><BsTwitterX className='f-i'/></a>
                </div>
            </div>


        </footer>
    </div>
  )
}

export default Footer
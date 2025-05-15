import React from 'react'
import VendorHeader from '../VendorsComponents/VendorHeader'
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import img from '../../Assets/Admin photo.png'
const Notification = () => {
  return (
    <div style={{background:"#fcf9f8"}}>
        {/* <VendorHeader/> */}

      <div className="main">
        <VendorsSidebar /> 
        <div className="main-right">
            <br />
            <div className="add-btns ord-btn">
                <div>
                    <Link to='/dashboard'>
                        <IoArrowBackOutline className='p-back'/>
                    </Link>
                    <h3>Notification</h3>
                        
                </div>

            </div>


            <div className="notify">
                <div className="notify-c">
                    <h5></h5>
                    <div className="content">
                        <img src={img} alt="" />
                        <div>
                            <h4>Mr Benson Macaulay</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsa, soluta accusamus quos fugit...</p>
                        </div>
                    </div>
                    <p className='time'>12:01pm</p>
                </div>
            </div>


            <div className="notify">
                <div className="notify-c">
                    <h5></h5>
                    <div className="content">
                        <img src={img} alt="" />
                        <div>
                            <h4>Mr Benson Macaulay</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsa, soluta accusamus quos fugit...</p>
                        </div>
                    </div>
                    <p className='time'>12:01pm</p>
                </div>
            </div>

            <div className="notify">
                <div className="notify-c">
                    <h5></h5>
                    <div className="content">
                        <img src={img} alt="" />
                        <div>
                            <h4>Mr Benson Macaulay</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsa, soluta accusamus quos fugit...</p>
                        </div>
                    </div>
                    <p className='time'>12:01pm</p>
                </div>
            </div>

            <div className="notify">
                <div className="notify-c">
                    <h5></h5>
                    <div className="content">
                        <img src={img} alt="" />
                        <div>
                            <h4>Mr Benson Macaulay</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsa, soluta accusamus quos fugit...</p>
                        </div>
                    </div>
                    <p className='time'>12:01pm</p>
                </div>
            </div>

            <div className="notify">
                <div className="notify-c">
                    <h5></h5>
                    <div className="content">
                        <img src={img} alt="" />
                        <div>
                            <h4>Mr Benson Macaulay</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ipsa, soluta accusamus quos fugit...</p>
                        </div>
                    </div>
                    <p className='time'>12:01pm</p>
                </div>
            </div>
            
        </div>

        
      </div>


    </div>
  )
}

export default Notification
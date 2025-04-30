import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";import defaultDp from '../../Assets/Admin photo.png';
import { IoArrowBackOutline } from "react-icons/io5";
import img1 from '../../Assets/image 135.png'
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const VendorLogout = () => {

    const profileRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
  
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleAccountDropdown = () => {
        setIsAccountOpen(!isAccountOpen);
        setIsOpen(true);
    };

  return (
    <div style={{background:"#fcf9f8"}}>
        <header className='adminheader vendorheader'>
            <nav>

            <ul>          

                <Link to='/' className='h-group'>
                    <FaRegBell className='h-i' style={{color: '#FF7700'}}/>
                </Link>

                {/* Profile Section */}
                <div className='h-group profile' ref={profileRef} onClick={toggleDropdown}>
                
                <img src={defaultDp} alt="Admin Profile" className="profile-image" />


                <div>
                <h5>User</h5> 
                    <p>Admin</p>
                </div>
                {isOpen ? <IoIosArrowUp className='h-i'/> : <IoIosArrowDown className='h-i'/>}

                            {/* Dropdown Modal */}
                {isOpen && (
                <div className="profile-dropdown">
                
                    <Link onClick={toggleAccountDropdown}>
                        <div className="prof">
                            <div>
                                <CiUser className='d-i'/>
                                <h5>Account</h5>
                            </div>
                            {isOpen ? <MdKeyboardArrowRight className='d-i'/> : <IoIosArrowDown className='d-i'/>}
                        </div>
                        
                    </Link>

                    <Link to="/profile">
                        <div className="prof">
                            <div>
                                <FaRegBell className='d-i'/>
                                <h5>Notification</h5>
                            </div>
                        </div>
                        
                    </Link>

                    <Link to="/profile">
                        <div className="prof">
                            <div>
                                <CiGlobe className='d-i'/>
                                <h5>App Language</h5>
                            </div>
                        </div>
                        
                    </Link>

                    <Link to="/profile">
                        <div className="prof">
                            <div>
                                <IoIosHelpCircleOutline className='d-i'/>
                                <h5>Help</h5>
                            </div>
                        </div>
                        
                    </Link>

                    <br /><br />

                    <Link to="/profile">

                        <div className="prof">
                            <div>
                                <IoIosLogOut className='d-i'/>
                                <h5>Log Out</h5>
                            </div>
                        </div>
                        
                    </Link>
                    
                </div>
                )}


                {isAccountOpen && (
                <div className="profile-dropdown acct-dropdown">
                
                    <h3>User</h3>
                    <h3>user@gmail.com</h3>
                    <Link to='/signin'><button>Login another account</button></Link>
                    <div><button className='btn2' onClick={toggleAccountDropdown}>Close</button></div>
                    <Link style={{color:'#FF7700'}} to='/signin'>LogOut</Link>

                    
                </div>
                )}
                </div>


            </ul>
            </nav>
        </header>

      <div className="main vendormain">
        <VendorsSidebar /> 
        <div className="main-right">

            <div className="log-screen">
                <div className="logout-form">
                    <div className="log-c">
                        <h3>Logout</h3>
                        <h5>Are you sure you want to logout?</h5>
                        <div className="log-btns">
                            <button className='can-btn'>Cancel</button>
                            <button>Logout</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        
      </div>


    </div>
  )
}

export default VendorLogout
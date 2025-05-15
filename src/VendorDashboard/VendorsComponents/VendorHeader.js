import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import defaultDp from '../../Assets/Admin photo.png';

const VendorHeader = ({ user }) => {
  // console.log("User in VendorHeader: ", JSON.stringify(user, null, 2));


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
              <h5>{user.name || 'User'}</h5> 
              <p>{user?.companyName || 'Admin'}</p> {/* or email */}
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

                <Link to="/vendor-notification">
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
                <h3>{user?.name || 'User'}</h3>
                <h3>{user?.email || 'user@email.com'}</h3>
                <Link to='/signin'><button>Login another account</button></Link>
                <div><button className='btn2' onClick={toggleAccountDropdown}>Close</button></div>
                <Link style={{color:'#FF7700'}} to='/signin'>LogOut</Link>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default VendorHeader
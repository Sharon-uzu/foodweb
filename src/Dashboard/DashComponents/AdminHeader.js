import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import logo from '../../Assets/ScanOrder logo pdf.png';
import dp from '../../Assets/Admin photo.png';
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Supabase } from "../../config/supabase-config";
import defaultDp from '../../Assets/Admin photo.png';


const AdminHeader = ({ userDetails, profileImage, signOut }) => {  
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const profileRef = useRef(null);


  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {  
    const handleClickOutside = (event) => {  
        if (profileRef.current && !profileRef.current.contains(event.target)) {  
            setIsOpen(false);  
            setIsAccountOpen(false);  
        }  
    };  

    document.addEventListener('click', handleClickOutside);  
    return () => {  
        document.removeEventListener('click', handleClickOutside);  
    };  
}, []);  


  return (
    <header className='adminheader'>
      <nav>
        <Link to='/'><img src={logo} alt="Logo" /></Link>

        <ul>
          {/* <h4>Dashboard</h4> */}
          <form>
            <div className="inp">
              <CiSearch className='f-i'/>
              <input type="search" name="" id="" />
            </div>
            <button>Search</button>
          </form>

          <Link to='/' className='h-group'>
            <FaRegBell className='h-i'/>
          </Link>

          {/* Profile Section */}
          <div className='h-group profile' ref={profileRef} onClick={toggleDropdown}>
          {/* <img src={userDetails?.image || defaultDp} alt="Admin Profile" className="profile-image" />   */}
          {userDetails?.business ? (
            <div className="profile-initial">
              {userDetails.business.charAt(0).toUpperCase()}
            </div>
          ) : (
            <img src={defaultDp} alt="Admin Profile" className="profile-image" />
          )}


          <div>
            <h5>{userDetails ? userDetails.business : "User"}</h5> 
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
             
              <h3>{userDetails ? userDetails.business : "User"}</h3>
              <h3>{userDetails ? userDetails.email : "User"}</h3>
              <Link to='/signin'><button>Login another account</button></Link>
              <div><button className='btn2' onClick={toggleAccountDropdown}>Close</button></div>
              <Link style={{color:'#FF7700'}} to='/signin'>LogOut</Link>

                
            </div>
          )}
          </div>


        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import logo from '../../Assets/logo.png';
import dp from '../../Assets/Admin photo.png';
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
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
          <h4>Dashboard</h4>
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
            <img src={dp} alt="Profile" />
            <div>
              <h5>Adam Smith</h5>
              <p>Admin</p>
            </div>
            {isOpen ? <IoIosArrowUp className='h-i'/> : <IoIosArrowDown className='h-i'/>}

                      {/* Dropdown Modal */}
          {isOpen && (
            <div className="profile-dropdown">
             
                <Link to="/profile">
                    <div className="prof">
                        <div>
                            <CiUser className='d-i'/>
                            <h5>Account</h5>
                        </div>
                        <MdKeyboardArrowRight className='d-i'/>
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
          </div>


        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;

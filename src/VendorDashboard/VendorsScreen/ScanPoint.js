import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import defaultDp from '../../Assets/Admin photo.png';
import img from '../../Assets/Product page Images.png'
import { IoArrowBackOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuArrowUp } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import pro from '../../Assets/lucide_image.png'
import { CiUser } from "react-icons/ci";
import img1 from '../../Assets/clarity_success-line.png'
import { IoCloseSharp } from "react-icons/io5";


const ScanPoint = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [scanGenerated, setScanGenerated] = useState(false); // <-- New state

    const handleToggle = () => setIsToggled(!isToggled);

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

    const handleGenerateScanPoint = () => {
        setScanGenerated(true); // When clicked, update the state
    };

    const handleDegenerateScanPoint = () => {
        setScanGenerated(false); // When clicked, update the state
    };

    const [showModal, setShowModal] = useState(false);

    const handleGenerateSuccess = () => {
        setShowModal(true); 
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
      <div className="main">
        <VendorsSidebar /> 
        <div className="main-right">
          <div className="dash-home" style={{backgroundColor:"transparent"}}>

          {!scanGenerated ? (<div className="scan-point">
             
                <div className="scan">
                  <div className="sp">
                    <h3>You’re yet to generate a scan point</h3>
                    <p>Follow the instructions below to generate a scan point</p>
                    <button onClick={handleGenerateScanPoint}>Generate Scan Point</button>
                  </div>
                </div>
              
            </div>) : (
                <div className="scan-form">
                    <div className="add-btns">
                        <div>
                            <Link to='/vendor'>
                                <IoArrowBackOutline className='p-back'/>
                            </Link>
                            <h3>Scan Point</h3>
                            
                        </div>

                    </div>
                  <div className="sf">
                    <div className="scan-form-container">
                        <div className="scfc">
                            <h4>Generate scan point</h4>
                            <label htmlFor="">
                                <p>Title</p>
                                <input type="text" placeholder='Enter title' className='s-inp'/>

                            </label>

                            <label htmlFor="">
                                <p>Align a service</p>
                                <div className="align">
                                    <div className="al1">
                                        <input type="checkbox" name="" id="" />
                                        <p>Kitchen</p>
                                    </div>
                                    
                                    <div className="al1">
                                        <input type="checkbox" name="" id="" />
                                        <p>Laundry</p>
                                    </div>
                                    <div className="al1">
                                        <input type="checkbox" name="" id="" />
                                        <p>Bar</p>
                                    </div>
                                    <div className="al1">
                                        <input type="checkbox" name="" id="" />
                                        <p>Games</p>
                                    </div>
                                </div>
                            </label>

                            <div className="assign">
                                <p>Assign to all services?</p>
                                <div className="toggle-container">
                                        <div
                                            className={`toggle-button ${isToggled ? 'toggled' : ''}`}
                                            onClick={handleToggle}
                                        >
                                            <div className="toggle-circle"></div>
                                        </div>
                                    </div>
                            </div>
                            <div className="s-btns">
                                <button className='bk' onClick={handleDegenerateScanPoint}>Go Back</button>
                                <button onClick={handleGenerateSuccess}>Generate</button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}


              {/* modal */}
              {showModal && (
                <div className="modal-overlay scan-modal">
                    
                    <div className="modal-content">
                        <div className="m-close">
                            <h3 onClick={() => { 
                                setShowModal(false); 
                                setScanGenerated(true);
                            }}>
                                <IoCloseSharp />

                            </h3>
                        </div>
                        <img className='mark-img' src={img1} alt="" />
                        
                        <p>Scan point successfully generated</p>
                    
                    </div>
                </div>
                )}


          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanPoint;

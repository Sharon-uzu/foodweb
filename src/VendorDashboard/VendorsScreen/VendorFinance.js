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
import { IoArrowBackOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import image from '../../Assets/p.png'
import image1 from '../../Assets/f.png'
import image2 from '../../Assets/k.png'



const VendorFinance = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [financeGenerated, setFinanceGenerated] = useState(false); // <-- New state

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

    const handleGenerateFinance = () => {
        setFinanceGenerated(true); // When clicked, update the state
    };

    const handleDegenerateFinance = () => {
        setFinanceGenerated(false); // When clicked, update the state
    };

    const [formCompleted, setFormCompleted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    
      
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

          {!financeGenerated ? (
            <div className="scan-point">
                <div className="scan">
                <div className="sp">
                    <h3>There is no registered payment account yet</h3>
                    <p>Register an account to access all your financial activities</p>
                    <button onClick={handleGenerateFinance}>Register now</button>
                </div>
                </div>
            </div>
            ) : !formCompleted ? (
            <div className="scan-form">
                <div className="add-btns">
                    <div>
                        <Link to='/vendor'>
                        <IoArrowBackOutline className='p-back'/>
                        </Link>
                        <h3>Account Registration</h3>
                    </div>
                </div>
                <div className="sf">
                <div className="scan-form-container finance">
                    <div className="scfc">
                        <input type="text" placeholder='Business [CAC]'/>
                        <input type="text" placeholder='Operational Address'/>
                        <input type="text" placeholder='Proof of Address'/>
                        <input type="number" placeholder='Account number'/>
                        <input type="text" placeholder='Bank name'/>
                        <input type="text" placeholder='Bank Verification Number (BVN)'/>
                        <button onClick={() => setFormCompleted(true)} style={{cursor:'pointer'}}>Done</button>
                    </div>
                </div>
                </div>
            </div>
            ) : (
                <div className="scan-form">
                <div className="add-btns">
                    <div>
                        <Link to='/vendor'>
                        <IoArrowBackOutline className='p-back'/>
                        </Link>
                        <h3>Account Registration</h3>
                    </div>
                </div>
                {!selectedImage && (
                  <div className="setup">
                    <h4>Account Setup</h4>
                    <p>Select from the following payment channels</p>

                    <div className="sf">
                      <div className="scan-form-container finance">
                        <div className="scfc">
                          <img src={image} alt="" onClick={() => setSelectedImage(image)} />
                          <img src={image1} alt="" onClick={() => setSelectedImage(image1)} />
                          <img src={image2} alt="" onClick={() => setSelectedImage(image2)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImage && (
                  <div className="setup-detail">
                    {/* <div className="add-btns">
                      <div>
                        <button onClick={() => setSelectedImage(null)} className="p-back">
                          <IoArrowBackOutline />
                        </button>
                        <h3>Payment Channel Detail</h3>
                      </div>
                    </div> */}

                    <div className="sf">
                      <div className="scan-form-container finance">
                        <div className="scfc">
                            <div className="s-img">
                                <img src={selectedImage} alt="Selected" style={{ width: '300px', borderRadius: '10px' }} />
                            </div>
                            <input type="email" placeholder='Email Address'/>
                            <input type="text" placeholder='Account ID'/>
                            <input type="text" placeholder='Secret key/password'/>
                            <button onClick={() => setFormCompleted(true)} style={{cursor:'pointer'}}>Done</button>

                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}




          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorFinance
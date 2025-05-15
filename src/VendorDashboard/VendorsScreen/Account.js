import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import VendorHeader from '../VendorsComponents/VendorHeader';

const Account = () => {

        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState({
        firstName: 'Emeka',
        lastName: 'Prince',
        email: 'emeka@gmail.com',
        password: '*****',
        });



        const handleEditClick = () => {
            setIsEditing(true);
          };
          
          const handleAccountInfoClick = () => {
            setIsEditing(false);
          };
          
        const handleSaveClick = () => {
        setIsEditing(false);
        // You can add save logic here (e.g., send data to backend)
        };

        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        };



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
                    <h3>Account</h3>
                        
                </div>

            </div>
            <div className="dash-account">
                <div className="account-top">
                    <div
                        className={`acc-tab ${!isEditing ? 'acc-active' : ''}`}
                        onClick={handleAccountInfoClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3>Account Information</h3>
                    </div>
    
                <div
                    className={`acc-tab ${isEditing ? 'acc-active' : ''}`}
                    onClick={handleEditClick}
                    style={{ cursor: 'pointer' }}
                >
                    <LuPencilLine className='acc-i' />
                    <h3>Edit Account</h3>
                </div>
    </div>


                <form className='account-form'>
                    <label>
                    <p>First Name</p>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                    </label>
                    <label>
                    <p>Last Name</p>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                    </label>
                    <label>
                    <p>Email</p>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />

                    </label>
                    <label>
                    <p>Password</p>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                    />
                    </label>

                    {isEditing && (
                    <div className="save-btn-container">
                    <button className='save-btn' onClick={handleSaveClick}>Save Changes</button>
                    </div>
                    )}

                </form>

                
            </div>






        </div>

        
      </div>


    </div>
  )
}

export default Account
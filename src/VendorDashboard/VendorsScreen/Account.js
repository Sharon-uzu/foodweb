import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import VendorHeader from '../VendorsComponents/VendorHeader';
import Loader from '../VendorsComponents/Loader';
import { useNavigate } from 'react-router-dom';

const Account = () => {

    const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

    const [loadingServices, setLoadingServices] = useState(false);


        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState(null);



        useEffect(() => {
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser);
            const fullName = parsedUser.user.name || '';
            const [firstName, lastName = ''] = fullName.split(' '); // safely handle names
            setFormData({
              fullName: parsedUser.user.name || '',
              companyName:parsedUser.user.companyName || '',
              email: parsedUser.user.email || '',
              phone: parsedUser.user.phone || '',
              // password: '*****',
            });
          } else {
            navigate('/signin');
          }
        }, [navigate]);
        

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

        if (!userData || loadingServices) {
            return <Loader />;
          }

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
                    <p>Full Name</p>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        readOnly
                    />
                    </label>
                    <label>
                    <p>Company Name</p>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        readOnly
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
                    <p>Phone</p>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        readOnly
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
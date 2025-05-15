import React, { useState } from 'react';  
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';  
import { Link } from 'react-router-dom';  
import { IoArrowBackOutline } from "react-icons/io5";  
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import VendorHeader from '../VendorsComponents/VendorHeader';  
import { ReactComponent as Payment1SVG } from '../../Assets/Frame 427319895.svg';  
import { ReactComponent as Payment2SVG } from '../../Assets/Frame 427319896 (1).svg';  
import { ReactComponent as Payment3SVG } from '../../Assets/image 140.svg';  
import { BiCopy } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { LuBookCheck } from "react-icons/lu";
import FinanceHistory from '../VendorsComponents/FinanceHistory';

const VendorFinance = () => {  
  const [isToggled, setIsToggled] = useState(false);  
  const [financeGenerated, setFinanceGenerated] = useState(false);  
  const [formCompleted, setFormCompleted] = useState(false);  
  const [selectedImage, setSelectedImage] = useState(null);  
  const [isSetupComplete, setIsSetupComplete] = useState(false);  
  const [showDetails, setShowDetails] = useState(false);  

  // States to store form data  
  const [email, setEmail] = useState('');  
  const [accountId, setAccountId] = useState('');  
  const [secretKey, setSecretKey] = useState('');  
  
  const handleGenerateFinance = () => {  
    setFinanceGenerated(true);  
  };  

  return (  
    <div style={{ background: "#fcf9f8", overflowY:'scroll'}}>  
      {/* <VendorHeader />   */}
      <div className="main">  
        <VendorsSidebar />  
        <div className="main-right">  
          <div className="dash-home" style={{ backgroundColor: "transparent" }}>  
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
                    <Link to="/dashboard">  
                      <IoArrowBackOutline className="p-back" />  
                    </Link>  
                    <h3>Account Registration</h3>  
                  </div>  
                </div>  
                <div className="sf">  
                  <div className="scan-form-container finance">  
                    <div className="scfc">  
                      <input type="text" placeholder="Business [CAC]" />  
                      <input type="text" placeholder="Operational Address" />  
                      <input type="text" placeholder="Proof of Address" />  
                      <input type="number" placeholder="Account number" />  
                      <input type="text" placeholder="Bank name" />  
                      <input type="text" placeholder="Bank Verification Number (BVN)" />  
                      <button onClick={() => setFormCompleted(true)} style={{ cursor: 'pointer' }}>Done</button>  
                    </div>  
                  </div>  
                </div>  
              </div>  
            ) : showDetails ? (  
              // Show account details after selecting payment setup  
              <div className="account-details">  
                <div className="add-btns">  
                  <div>   
                    <h3>Finance</h3>  
                  </div>  
                </div>  
                <div className="date-action">
                  <div className='date-d'>
                    <h4>Sep 20, 2025</h4>
                  </div>

                  <div className="actions">
                    <div>
                      <FaArrowUpRightFromSquare className='ac-i'/>
                    </div>
                    <div>
                      <BiCopy className='ac-i'/>
                    </div>
                  </div>
                </div>

                <div className="finance-cards">

                  <div className="fin-card">
                    <div className="fcc">
                      <div className="circ">
                        <TbCurrencyNaira className='cc-i'/>
                      </div>
                      <div className="fin-txt">
                        <p>Balance</p>
                        <h4>₦0.00</h4>
                      </div>
                    </div>
                  </div>

                  <div className="fin-card">
                    <div className="fcc">
                      <div className="circ">
                        <FaArrowDownLong className='cc-i'/>
                      </div>
                      <div className="fin-txt">
                        <p>Income</p>
                        <h4>₦0.00</h4>
                      </div>
                    </div>
                  </div>


                  <div className="fin-card">
                    <div className="fcc">
                      <div className="circ">
                        <LuBookCheck className='cc-i'/>
                      </div>
                      <div className="fin-txt">
                        <p>Saving</p>
                        <h4>₦0.00</h4>
                      </div>
                    </div>
                  </div>

                  <div className="fin-card">
                    <div className="fcc">
                      <div className="circ">
                        <FaArrowUpLong className='cc-i'/>
                      </div>
                      <div className="fin-txt">
                        <p>Expenses</p>
                        <h4>₦0.00</h4>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="finance-btns">

                  <Link to=''>
                    <button className='paym'>Make Payment</button>
                  </Link>

                  <Link to=''>
                    <button>Receive Funds</button>
                  </Link>

                </div>

                <FinanceHistory/>




              </div>  
            ) : (  
              // The payment setup screen  
              <div className="scan-form">  
                <div className="add-btns">  
                  <div>  
                    <Link to='/dashboard'>  
                      <IoArrowBackOutline className='p-back'/>  
                    </Link>  
                    <h3>Account Setup</h3>  
                  </div>  
                </div>  
                {!selectedImage ? (  
                  <div className="setup">  
                    <h4>Select from the following payment channels</h4>  
                    <div className="sf">  
                      <div className="scan-form-container finance">  
                        <div className="scfc">  
                          {/* <img src={image} alt="" style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setSelectedImage(image)} />  
                          <img src={image1} alt="" style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setSelectedImage(image1)} />  
                          <img src={image2} alt="" style={{ cursor: 'pointer' }} onClick={() => setSelectedImage(image2)} />   */}
                          <Payment1SVG  
                            className='img'
                            style={{ cursor: 'pointer', marginRight: '10px'}}  
                            onClick={() => setSelectedImage(<Payment1SVG />)}  
                          />  
                          <Payment2SVG 
                            className='img' 
                            style={{ cursor: 'pointer', marginRight: '10px' }}  
                            onClick={() => setSelectedImage(<Payment2SVG />)}  
                          />  
                          <Payment3SVG
                            className='img'  
                            style={{ cursor: 'pointer'}}  
                            onClick={() => setSelectedImage(<Payment3SVG />)}  
                          />   
                        </div>  
                      </div>  
                    </div>  
                  </div>  
                ) : (  
                  // Show details form for the selected payment channel  
                  <div className="setup-detail">  
                    <div className="sf">  
                      <div className="scan-form-container finance">  
                        <div className="scfc">  
                          <div className="s-img">  
                            {selectedImage}   
                          </div>  
                          <input  
                            type="email"  
                            placeholder="Email Address"  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                          />  
                          <input  
                            type="text"  
                            placeholder="Account ID"  
                            value={accountId}  
                            onChange={(e) => setAccountId(e.target.value)}  
                          />  
                          <input  
                            type="text"  
                            placeholder="Secret key/password"  
                            value={secretKey}  
                            onChange={(e) => setSecretKey(e.target.value)}  
                          />  
                          <button  
                            onClick={() => {  
                              setIsSetupComplete(true);  
                              setShowDetails(true);  
                            }}  
                            style={{ cursor: 'pointer' }}  
                          >  
                            Done  
                          </button>  
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
  );  
};  

export default VendorFinance;  
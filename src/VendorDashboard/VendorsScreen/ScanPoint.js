import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import img1 from '../../Assets/clarity_success-line.png'
import { IoCloseSharp } from "react-icons/io5";
import VendorHeader from '../VendorsComponents/VendorHeader';


const ScanPoint = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [scanGenerated, setScanGenerated] = useState(false); // <-- New state

    const handleToggle = () => setIsToggled(!isToggled);


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
       {/* <VendorHeader/> */}
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

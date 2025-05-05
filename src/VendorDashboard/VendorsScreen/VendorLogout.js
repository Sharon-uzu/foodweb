import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import VendorHeader from '../VendorsComponents/VendorHeader';

const VendorLogout = () => {


  return (
    <div style={{background:"#fcf9f8"}}>
        {/* <VendorHeader/> */}

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
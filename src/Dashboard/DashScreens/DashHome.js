import React from 'react'
import Footer from '../../Components/Footer'
import AdminHeader from '../DashComponents/AdminHeader'
import CategoryImages from '../../Components/CategoryImages'
import { MdOutlineSendToMobile } from "react-icons/md";

import Sidebar from '../DashComponents/Sidebar'
import { TbCheckupList, TbTruckDelivery } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';
import Graph from '../DashComponents/Graph';
import History from '../DashComponents/History';
import { Link } from 'react-router-dom';


const DashHome = ({ userDetails, profileImage }) => {
  return (
    <div>
            <AdminHeader userDetails={userDetails} profileImage={profileImage} />
     

            {/* <div className="menu">
                <CategoryImages/>
            </div> */}

            <div className='cat-menu' 
            // onClick={handleClick}
            >
                    {/* {click ? (<RiCloseFill id='close' />) : (<BiMenuAltLeft id='bar' />)} */}
            </div>

            <div className="main">
                <Sidebar/>

                <div className="main-right">
                    <div className="dash-home">
                        <div className="dh-c">
                            <h2>Today’s Sales</h2>
                            <h3>Sales Analytics</h3>

                            <div className="dh-cards">
                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <MdOutlineSendToMobile className='d-icon'/>
                                        <p>Total Sales</p>
                                        <h5>$4K</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <TbCheckupList className='d-icon'/>
                                        <p>Total Order</p>
                                        <h5>$4.1K</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <TbTruckDelivery className='d-icon'/>
                                        <p>Total Delivery</p>
                                        <h5>$3.7K</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <HiOutlineUsers className='d-icon'/>
                                        <p>Total Customers</p>
                                        <h5>$7K</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                
                            </div>

                            
                            
                        </div>

                        
                    </div>

                    <div className='chart' >
                        <h3>Customer's Satisfaction</h3>

                        <Graph/>
                    </div>

                    <div className="history-table">
                        <History/>
                    </div>

                </div>


            </div>

            <Footer />
        </div>
  )
}

export default DashHome
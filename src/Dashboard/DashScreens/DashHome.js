import React from 'react'
import Footer from '../../Components/Footer'
import AdminHeader from '../DashComponents/AdminHeader'
import CategoryImages from '../../Components/CategoryImages'
import { NavLink } from 'react-router-dom'
import { FaCube } from "react-icons/fa";
import { MdOutlineNoFood } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaTableList } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";


const DashHome = () => {
  return (
    <div>
            <AdminHeader />

            <div className="menu">
                <CategoryImages/>
            </div>

            <div className='cat-menu' 
            // onClick={handleClick}
            >
                    {/* {click ? (<RiCloseFill id='close' />) : (<BiMenuAltLeft id='bar' />)} */}
            </div>

            <div className="main-category">
                <div className='cat-sidebar'
                // className={click ? 'cat-sidebar active' : 'cat-sidebar'}
                >
                    <div className="category-sidebar dash-sidebar">

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <LuLayoutDashboard className='icon'/>
                                    <h4>Dashboard</h4>
                                </div>

                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <MdOutlineNoFood className='icon'/>
                                    <h4>Meals</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <FaTableList className='icon'/>
                                    <h4>Tables</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineFileDone className='icon'/>
                                    <h4>Orders</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <TbReport className='icon'/>
                                    <h4>Sales Report</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <IoIosHelpCircleOutline className='icon'/>
                                    <h4>Help</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <IoSettingsOutline className='icon'/>
                                    <h4>Setting</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <FiUsers className='icon'/>
                                    <h4>Users</h4>
                                </div>
                            </div>
                        
                        </NavLink>

          

                        
                        <NavLink to='/admin' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <IoIosLogOut className='icon'/>
                                    <h4>LogOut</h4>
                                </div>
                            </div>
                        
                        </NavLink>
                        
                    </div>
                </div>

                <div className="foods">
                    <div className="foods-c">
                        <h2>Our Menu</h2>
                        
                    </div>
                </div>
            </div>

            <Footer />
        </div>
  )
}

export default DashHome
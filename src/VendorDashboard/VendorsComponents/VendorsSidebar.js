import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineFileDone } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Supabase } from '../../config/supabase-config';  
import { AiOutlineProduct } from "react-icons/ai";
import img from '../../Assets/jet.png'

const VendorsSidebar = () => {


    const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    document.body.style.overflow = click ? 'auto' : 'hidden'; // Disable or enable scrolling

  }

  const closeMenuBar = () => {
    setClick(false);
    document.body.style.overflow = 'auto'; // Enable scrolling

  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
      setIsOpen(!isOpen);
  };


  return (
    <div className='ssbar'>
        <div>

            <div className='barss' onClick={handleClick}>
                {click ? (<RiCloseFill id='close' />) : (<FaBars id='bar' />)}
            </div>
        
            <div className={click ? 'sidebar active' : 'sidebar'}
            // className={click ? 'cat-sidebar active' : 'cat-sidebar'}
            >

                
                <div className="category-sidebar dash-sidebar  vv-bar">
                    <div>

                        <NavLink to='/vendor' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <LuLayoutDashboard className='icon'/>
                                    <h4>Dashboard</h4>
                                </div>

                            </div>
                        
                        </NavLink>

                        <NavLink to='/vendor-service' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineProduct className='icon'/>
                                    <h4>Service</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/scanpoint' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineProduct className='icon'/>
                                    <h4>Scan point</h4>
                                </div>
                            </div>
                        
                        </NavLink>
                        <NavLink to='/vendor-finance' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineProduct className='icon'/>
                                    <h4>Finance</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/addproducts' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineProduct className='icon'/>
                                    <h4>Products</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/vendors-orders' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <AiOutlineFileDone className='icon'/>
                                    <h4>Orders</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        <NavLink to='/account' className='links' activeclassName = 'active' onClick={closeMenuBar}>
                    
                            <div className='link'>
                                <div>
                            
                                    <TbReport className='icon'/>
                                    <h4>Account</h4>
                                </div>
                            </div>
                        
                        </NavLink>

                        
                        <NavLink to='/vlogout' className='links' activeclassName = 'active'>
                    
                            <div className='link'>
                                <div>
                            
                                    <IoIosLogOut className='icon'/>
                                    <h4>LogOut</h4>
                                </div>
                            </div>
                        
                        </NavLink>
                    </div>

                    <div className="back-to-plan">
                        <div className="btc">
                            <img src={img} alt="" />
                            <h3>Want to Upgrade?</h3>
                            <Link to=''><button>Upgrade</button></Link>
                        </div>
                    </div>

                    
                </div>

                

            </div>
        </div>

        
     </div>
  )
}

export default VendorsSidebar
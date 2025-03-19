import React,{useState} from 'react'
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
import { TbReportAnalytics } from "react-icons/tb";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Supabase } from '../../config/supabase-config';  

const Sidebar = () => {

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

  const navigate = useNavigate();

  const signOut = async () => {  
    // Call your sign out logic here  
    // Assuming you have Supabase as mentioned in your original code:  
    await Supabase.auth.signOut(); // Sign out from Supabase  
    localStorage.removeItem("userDetails"); // Clear user details from local storage  
    navigate('/'); // Redirect to the homepage after logout  
};  

const handleLogout = async () => {  
    await signOut(); // Call signOut function  
};  

  return (
    <div className='ssbar'>

        <div className='barss' onClick={handleClick}>
            {click ? (<RiCloseFill id='close' />) : (<FaBars id='bar' />)}
        </div>
    
        <div className={click ? 'sidebar active' : 'sidebar'}
        // className={click ? 'cat-sidebar active' : 'cat-sidebar'}
        >

            
            <div className="category-sidebar dash-sidebar">

                <NavLink to='/admin' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <LuLayoutDashboard className='icon'/>
                            <h4>Dashboard</h4>
                        </div>

                    </div>
                
                </NavLink>

                <NavLink to='/meals' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <MdOutlineNoFood className='icon'/>
                            <h4>Meals</h4>
                        </div>
                    </div>
                
                </NavLink>

                <NavLink to='/table' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <FaTableList className='icon'/>
                            <h4>Tables</h4>
                        </div>
                    </div>
                
                </NavLink>

                <NavLink to='/orders' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <AiOutlineFileDone className='icon'/>
                            <h4>Orders</h4>
                        </div>
                    </div>
                
                </NavLink>

                <NavLink to='/sales' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <TbReport className='icon'/>
                            <h4>Sales Report</h4>
                        </div>
                    </div>
                
                </NavLink>


                

                <NavLink to='/users' className='links' activeclassName = 'active' onClick={closeMenuBar}>
            
                    <div className='link'>
                        <div>
                    
                            <FiUsers className='icon'/>
                            <h4>Users</h4>
                        </div>
                    </div>
                
                </NavLink>



                
                <NavLink to='/admi' className='links' activeclassName = 'active' onClick={handleLogout}>
            
                    <div className='link'>
                        <div>
                    
                            <IoIosLogOut className='icon'/>
                            <h4>LogOut</h4>
                        </div>
                    </div>
                
                </NavLink>
                
            </div>
        </div>
     </div>
  )
}

export default Sidebar
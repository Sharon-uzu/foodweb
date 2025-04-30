import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";import defaultDp from '../../Assets/Admin photo.png';
import { IoArrowBackOutline } from "react-icons/io5";
import img1 from '../../Assets/image 135.png'
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const transactions = [
    {
      id: 1,
      image: img1,
      number: 'TXN123456',
      food:'Ice cream',
      name: 'John Doe',
      amount: '$120.00',
      date: '2025-04-10',
      paymentType: 'Card',
      status: 'Delivered',
    },
    {
      id: 2,
      image: img1,
      number: 'TXN123457',
      food:'Rice',
      name: 'Jane Smith',
      amount: '$85.50',
      date: '2025-04-11',
      paymentType: 'PayPal',
      status: 'Shipping',
    },
    {
      id: 3,
      image: img1,
      number: 'TXN123458',
      food:'Burger',
      name: 'Alice Johnson',
      amount: '$49.99',
      date: '2025-04-12',
      paymentType: 'Transfer',
      status: 'Cancelled',
    },
    {
        id: 4,
        image: img1,
        number: 'TXN123457',
        food:'Rice',
        name: 'Jane Smith',
        amount: '$85.50',
        date: '2025-04-11',
        paymentType: 'PayPal',
        status: 'Pending',
      },
      {
        id: 5,
        image: img1,
        number: 'TXN123458',
        food:'Burger',
        name: 'Alice Johnson',
        amount: '$49.99',
        date: '2025-04-12',
        paymentType: 'Transfer',
        status: 'Cancelled',
      },
      {
        id: 6,
        image: img1,
        number: 'TXN123456',
        food:'Ice cream',
        name: 'John Doe',
        amount: '$120.00',
        date: '2025-04-10',
        paymentType: 'Card',
        status: 'Delivered',
      },
      {
        id: 7,
        image: img1,
        number: 'TXN123457',
        food:'Rice',
        name: 'Jane Smith',
        amount: '$85.50',
        date: '2025-04-11',
        paymentType: 'PayPal',
        status: 'Shipping',
      },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
         return { color: '#0FBF38', //backgroundColor: '#d4edda' 
        };
      case 'Shipping':
        return { color: '#FDB210', //backgroundColor: '#fff3cd' 
    };
      case 'Cancelled':
        return { color: '#FF3B30', //backgroundColor: '#f8d7da'
     };
      default:
        return { color: '#ADADAD', //backgroundColor: '#e2e3e5' 
    };
    }
  };
  
  const statusList = ['All', 'Pending', 'Shipping', 'Delivered', 'Cancelled'];

const VendorsOrders = () => {

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

        const [activeStatus, setActiveStatus] = useState('All');
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 5;

        const handleStatusChange = (status) => {
            setActiveStatus(status);
            setCurrentPage(1); // reset to first page on filter change
        };

        const filteredTransactions = activeStatus === 'All'
            ? transactions
            : transactions.filter(tx => tx.status === activeStatus);

        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
        const paginatedTransactions = filteredTransactions.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        const countByStatus = (status) => {
            return transactions.filter(tx => status === 'All' || tx.status === status).length;
        };

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

            <div className="add-btns ord-btn">
                <div>
                    <Link to='/vendor'>
                        <IoArrowBackOutline className='p-back'/>
                    </Link>
                    <h3>Orders</h3>
                        
                </div>

            </div>
            <div className="dash-home">
                     
                    <div className="ord-heading">
                        <div className="ord-hc">
                            {statusList.map(status => (
                            <h5
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                style={{
                                cursor: 'pointer',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                // background: activeStatus === status ? '#FF7700' : 'transparent',
                                color: activeStatus === status ? '#FF7700' : '#000'
                                }}
                            >
                                {status} ({countByStatus(status)})
                            </h5>
                            ))}
                        </div>
                    </div>

                    <div className="ord-table">
                        <table>
                            <tr>
                                <div className="r-rc">
                                    <th>Orders</th>
                                    <th>Customer</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </div>
                            </tr>

                            {paginatedTransactions.map((tx) => (
                                <tr key={tx.id} className="r-row">
                                    <div className="r-rc">
                                        <td className="rd">
                                            <img src={tx.image} alt="" />
                                            <div>
                                                <h4>{tx.number}</h4>
                                                <p>{tx.food}</p>
                                            </div>
                                        </td>
                                        <td className='pp'>{tx.name}</td>
                                        <td className='pp'>{tx.amount}</td>
                                        <td className='pp'>{tx.date}</td>
                                        <td className='pp' style={{color:'#FF7700'}}>{tx.paymentType}</td>
                                        <td className={`pp status ${tx.status.toLowerCase()}` } style={{ borderRadius: '5px', ...getStatusColor(tx.status) }}>{tx.status}</td>
                                        <td className='pp pp1'><FaRegEye/></td>
                                        <td className='pp pp1'><MdOutlineCancel/></td>
                                    </div>
                                </tr>
                                ))}
                        </table>

                        {/* Pagination */}
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
                            {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                background: currentPage === i + 1 ? '#FF7700' : '#eee',
                                color: currentPage === i + 1 ? '#fff' : '#000',
                                border: 'none',
                                cursor: 'pointer'
                                }}
                            >
                                {i + 1}
                            </button>
                            ))}
                        </div>

                    </div>

            </div>





        </div>

        
      </div>


    </div>
  )
}

export default VendorsOrders
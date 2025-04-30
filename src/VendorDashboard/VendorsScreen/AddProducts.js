import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import defaultDp from '../../Assets/Admin photo.png';
import img from '../../Assets/Product page Images.png'
import { IoArrowBackOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuArrowUp } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import pro from '../../Assets/lucide_image.png'


const AddProducts = () => {

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

        const products = [
            {
              id: 1,
              name: "Vegetable Pizza",
              price: 35000,
              oldPrice: 45000,
              discount: "-14%",
              sales: 554,
              remaining: 235,
              rating: 13,
              img: img,
            },
            {
              id: 2,
              name: "Cheese Burger",
              price: 25000,
              oldPrice: 30000,
              discount: "-17%",
              sales: 420,
              remaining: 190,
              rating: 22,
              img: img,
            },
            {
                id: 3,
                name: "Cheese Burger",
                price: 25000,
                oldPrice: 30000,
                discount: "-17%",
                sales: 420,
                remaining: 190,
                rating: 22,
                img: img,
              },
              {
                id: 4,
                name: "Cheese Burger",
                price: 25000,
                oldPrice: 30000,
                discount: "-17%",
                sales: 420,
                remaining: 190,
                rating: 22,
                img: img,
              },
              {
                id: 5,
                name: "Cheese Burger",
                price: 25000,
                oldPrice: 30000,
                discount: "-17%",
                sales: 420,
                remaining: 190,
                rating: 22,
                img: img,
              },
              {
                id: 6,
                name: "Cheese Burger",
                price: 25000,
                oldPrice: 30000,
                discount: "-17%",
                sales: 420,
                remaining: 190,
                rating: 22,
                img: img,
              }
          ];

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

          

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
            <div className="dash-home">
                <div className="add-btns">
                    <div>
                        <Link to='/vendor'>
                            <IoArrowBackOutline className='p-back'/>
                        </Link>
                        <h3>Products</h3>
                        
                    </div>

                    <button onClick={handleOpenModal}>Add New Product</button>
                </div>


                <div className="uploaded-p">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <div className="product1">
                        <div className="pp1-c">
                            <div className="pp-top">
                            <img src={product.img} alt={product.name} />
                            <div className="pp-txt">
                                <div className="p-name">
                                <h4>{product.name}</h4>
                                <HiDotsHorizontal className='ppp-i'/>
                                </div>
                                <h3>N{product.price.toLocaleString()}</h3>
                                <div className="bonus">
                                <p>N{product.oldPrice.toLocaleString()}</p>
                                <h6>{product.discount}</h6>
                                </div>
                            </div>
                            </div>

                            <div className="row1">
                                <div className="row1-c">
                                    <p>A vibrant medley of nature’s sweetest gifts, our fruit salad is a refreshing burst of color, flavor, and nutrition in every bite.</p>
                                </div>
                            </div>

                            <div className="row1">
                            <div className="row1-c">
                                <p>No. of sales</p>
                                <div>
                                <LuArrowUp className='rr-i'/>
                                <p>{product.sales}</p>
                                </div>
                            </div>
                            </div>

                            <div className="row1">
                            <div className="row1-c">
                                <p>reamining product</p>
                                <div>
                                <div className="prog">
                                    <span></span>
                                </div>
                                <p>{product.remaining}</p>
                                </div>
                            </div>
                            </div>

                            <div className="row1">
                            <div className="row1-c">
                                <p>Review</p>
                                <p>{product.rating}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}

                    
                </div>

            </div>

            {showModal && (
                <div className="product-modal-overlay">
                    <div className="modal">
                        <h2>Add New Product</h2>
                        <form>
                            
                            <div className="image-file">
                                <div className='add-img'>
                                    <img src={pro} alt="" />
                                    <div>
                                        <GoPlus className='plus'/>
                                        <p>Add product image</p>
                                    </div>
                                </div>
                            </div>

                            <input type="text" placeholder="Product Category" />

                            <input type="text" placeholder="Product Name" />

                            <input type="number" placeholder="Price" />

                            <input type="number" placeholder="Quantity" />

                            <input type="text" placeholder="Color" />

                            <input type="text" placeholder="Size" />

                            <div className="modal-buttons">
                            <button type="submit">Save</button>
                            <button className='b-cancel' type="button" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                )}




        </div>

        
      </div>


    </div>
  )
}

export default AddProducts
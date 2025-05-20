import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import defaultDp from '../../Assets/Admin photo.png';
import img from '../../Assets/Product page Images.png'
import { IoArrowBackOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuArrowUp } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import pro from '../../Assets/lucide_image.png'
import VendorHeader from '../VendorsComponents/VendorHeader';
import { useNavigate } from 'react-router-dom';
import Loader from '../VendorsComponents/Loader';


const AddProducts = () => {


    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        // Redirect to /signin if not authenticated
        navigate('/signin');
      }
    }, [navigate]);
  
  

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

    const [loadingServices, setLoadingServices] = useState(false);

    const [activeMenuId, setActiveMenuId] = useState(null);

    const toggleMenu = (productId) => {
      setActiveMenuId(prevId => (prevId === productId ? null : productId));
    };
    
    const closeMenu = () => {
      setActiveMenuId(null);
    };

    const menuRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);



      
if (!userData || loadingServices) {
    return <Loader />;
  }

  return (
    <div style={{background:"#fcf9f8"}}>
        {/* <VendorHeader/> */}

      <div className="main">
        <VendorsSidebar /> 
        <div className="main-right">
            <div className="dash-home">
                <div className="add-btns">
                    <div>
                        <Link to='/dashboard'>
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
                                <div className="dots-menu-container" style={{ position: 'relative' }} onClick={(e) => { 
                                    e.stopPropagation(); 
                                    toggleMenu(product.id); 
                                  }}>
                                  <HiDotsHorizontal className='ppp-i' style={{cursor:"pointer"}}/>

                                  {activeMenuId === product.id && (
                                    <div className="product-action-menu" ref={menuRef}>
                                      <button onClick={() => alert(`Edit ${product.name}`)}>Edit</button>
                                      <button onClick={() => alert(`Delete ${product.name}`)} className="danger">Delete</button>
                                    </div>
                                  )}
                                </div>

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
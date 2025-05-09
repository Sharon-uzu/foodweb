import React, { useState, useRef, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import pro from '../../Assets/lucide_image.png';
import img1 from '../../Assets/clarity_success-line.png';
import { IoCloseSharp } from "react-icons/io5";
import img from '../../Assets/Product page Images.png';
import { LuArrowUp } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import img2 from '../../Assets/image 135.png'
import VendorHeader from '../VendorsComponents/VendorHeader';
import { useNavigate } from 'react-router-dom';


const productItems = [
    {
      id: 1,
      image: img2,
      number: 'TXN123456',
      food:'Ice cream',
      name: 'John Doe',
      amount: '$120.00',
      date: '2025-04-10',
    
    },
    {
      id: 2,
      image: img2,
      number: 'TXN123457',
      food:'Rice',
      name: 'Jane Smith',
      amount: '$85.50',
      date: '2025-04-11',
     
    },
    {
      id: 3,
      image: img2,
      number: 'TXN123458',
      food:'Burger',
      name: 'Alice Johnson',
      amount: '$49.99',
      date: '2025-04-12',
   
    },
    {
        id: 4,
        image: img2,
        number: 'TXN123457',
        food:'Rice',
        name: 'Jane Smith',
        amount: '$85.50',
        date: '2025-04-11',
       
      },
      {
        id: 5,
        image: img2,
        number: 'TXN123458',
        food:'Burger',
        name: 'Alice Johnson',
        amount: '$49.99',
        date: '2025-04-12',
      
      },
      {
        id: 6,
        image: img2,
        number: 'TXN123456',
        food:'Ice cream',
        name: 'John Doe',
        amount: '$120.00',
        date: '2025-04-10',
       
      },
      {
        id: 7,
        image: img2,
        number: 'TXN123457',
        food:'Rice',
        name: 'Jane Smith',
        amount: '$85.50',
        date: '2025-04-11',
       
      },
  ];

 
  
  


const VendorService = () => {

    // items
    const [activeStatus, setActiveStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleStatusChange = (status) => {
        setActiveStatus(status);
        setCurrentPage(1); // reset to first page on filter change
    };

    const filteredProducts = activeStatus === 'All'
        ? productItems
        : productItems.filter(tx => tx.status === activeStatus);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const countByStatus = (status) => {
        return productItems.filter(tx => status === 'All' || tx.status === status).length;
    };




  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled(!isToggled);


  const [serviceGenerated, setServiceGenerated] = useState(false);
  const handleGenerateService = () => setServiceGenerated(true);
  const handleDegenerateService = () => setServiceGenerated(false);

  const [showModal, setShowModal] = useState(false);
  const [serviceFinalized, setServiceFinalized] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setServiceFinalized(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const services = [
    {
      id: 1,
      name: "VIP Service",
      price: 35000,
      oldPrice: 45000,
      discount: "-14%",
      scans: 554,
      order: 235,
      rating: 13,
      img: img,
      description:'A vibrant medley of nature’s sweetest gifts, our fruit salad is a refreshing burst of color, flavor, and nutrition in every bite.',
    },
    {
      id: 2,
      name: "VVIP Service",
      price: 25000,
      oldPrice: 30000,
      discount: "-17%",
      scans: 420,
      order: 190,
      rating: 22,
      img: img,
      description:'A vibrant medley of nature’s sweetest gifts, our fruit salad is a refreshing burst of color, flavor, and nutrition in every bite.',

    },
    {
      id: 3,
      name: "Regular Service",
      price: 20000,
      oldPrice: 25000,
      discount: "-20%",
      scans: 330,
      order: 160,
      rating: 18,
      img: img,
      description:'A vibrant medley of nature’s sweetest gifts, our fruit salad is a refreshing burst of color, flavor, and nutrition in every bite.',
    }
  ];

//   Add item modal

const [showAddItemModal, setShowAddItemModal] = useState(false);

const [isSubmitting, setIsSubmitting] = useState(false);


const [serviceData, setServiceData] = useState({
  service: '',
  description: '',
  hasPaidItems: false,
});

const handleGenerateSuccess = async () => {
  setIsSubmitting(true);

  const payload = {
    service: "Laundry",
    description: "We offer laundry service for free",
    hasPaidItems: isToggled,
  };

  try {
    const token = localStorage.getItem("token"); // Assuming token is stored
    const response = await fetch("https://scanorder-server.vercel.app/api/v1/user/createService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Make sure token is present
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to create service");

    const data = await response.json();
    console.log("Service created:", data);
    setShowModal(true); // Success modal
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};

const navigate = useNavigate();
const [user, setUser] = useState(null);

useEffect(() => {
  const savedUser = localStorage.getItem('userDetails');
  if (!savedUser) {
    navigate('/'); // redirect to SignIn if not logged in
  } else {
    const parsedUser = JSON.parse(savedUser);
    console.log('hello:', parsedUser); // 👈 Log the user details here
    setUser(parsedUser);
  }
}, []);


if (!user) return null;

  return (
    <div style={{ background: "#fcf9f8" }}>
      {/* <VendorHeader/> */}

      <div className="main">
        <VendorsSidebar />
        <div className="main-right">
          <div className="dash-home" style={{ backgroundColor: "transparent" }}>

            {!serviceGenerated && !serviceFinalized && (
              <div className="scan-point">
                <div className="scan">
                  <div className="sp">
                    <h3>You’re yet to create a service</h3>
                    <p>Follow the instructions below to create a service</p>
                    <button onClick={handleGenerateService}>Create Service</button>
                  </div>
                </div>
              </div>
            )}

            {serviceGenerated && !showModal && !serviceFinalized && (
              <div className="scan-form">
                <div className="add-btns">
                  <div>
                    <Link to='/vendor'>
                      <IoArrowBackOutline className='p-back' />
                    </Link>
                    <h3>Service</h3>
                  </div>
                </div>
                <br />
                <div className="product-modal-overlay vendor-service">
                  <div className="modal">
                    <form className='pm-form'>
                      
                    <input
                      type="text"
                      placeholder="Service title"
                      value={serviceData.service}
                      onChange={(e) => setServiceData({ ...serviceData, service: e.target.value })}
                    />
                      <textarea
                        cols="30"
                        rows="10"
                        placeholder='Description'
                        value={serviceData.description}
                        onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                      />
                      <div className="toggle-p">
                        <div className="tp-c">
                          <h5>Has paid item?</h5>
                          <div className="toggle-container">
                            <div
                              className={`toggle-button ${isToggled ? 'toggled' : ''}`}
                              onClick={() => {
                                setIsToggled(!isToggled);
                                setServiceData(prev => ({ ...prev, hasPaidItems: !prev.hasPaidItems }));
                              }}
                            >
                              <div className="toggle-circle"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-buttons">
                        <button type="button" onClick={handleGenerateSuccess}>
                          {isSubmitting ? "Loading..." : "Add Now"}
                        </button>
                        <button className='b-cancel' type="button" onClick={handleDegenerateService}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {showModal && (
              <div className="modal-overlay scan-modal">
                <div className="modal-content">
                  <div className="m-close">
                    <h3 onClick={() => {
                      setShowModal(false);
                      setServiceFinalized(true);
                    }}>
                      <IoCloseSharp />
                    </h3>
                  </div>
                  <img className='mark-img' src={img1} alt="" />
                  <p>Service successfully created</p>
                </div>
              </div>
            )}

            {/* SHOW LIST */}
            {serviceFinalized && !selectedService && (
              <div>
                <div className="add-btns">
                  <div>
                    <Link to='/vendor'>
                      <IoArrowBackOutline className='p-back' />
                    </Link>
                    <h3>Service(s)</h3>
                  </div>
                  <button onClick={() => {
                    setServiceGenerated(true);
                    setServiceFinalized(false);
                    setShowModal(false);
                  }}>
                    Add New Service
                  </button>
                </div>
                <div className="uploaded-p">
                  {services.map((service) => (
                    <div
                      className="product-card"
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="product1">
                        <div className="pp1-c">
                          <div className="pp-top">
                            <img src={service.img} alt={service.name} />
                            <div className="pp-txt">
                              <div className="p-name">
                                <h4>{service.name}</h4>
                                <HiDotsHorizontal className='ppp-i' />
                              </div>
                              <h3>N{service.price.toLocaleString()}</h3>
                              <div className="bonus">
                                <p>N{service.oldPrice.toLocaleString()}</p>
                                <h6>{service.discount}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="row1">
                            <div className="row1-c">
                              <p>{service.description}</p>
                            </div>
                          </div>
                          <div className="row1">
                            <div className="row1-c">
                              <p>No. of scans</p>
                              <div>
                                <LuArrowUp className='rr-i' />
                                <p>{service.scans}</p>
                              </div>
                            </div>
                          </div>
                          <div className="row1">
                            <div className="row1-c">
                              <p>No. of orders</p>
                              <div>
                                <div className="prog">
                                  <span></span>
                                </div>
                                <p>{service.order}</p>
                              </div>
                            </div>
                          </div>
                          <div className="row1">
                            <div className="row1-c">
                              <p>Review</p>
                              <p>{service.rating}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SHOW DETAIL */}
            {selectedService && (
              <div className="service-detail">
                <div className="add-btns">
                  <div>
                    <IoArrowBackOutline
                      className='p-back'
                      onClick={() => setSelectedService(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    <h3>{selectedService.name}</h3>
                  </div>
                  <button onClick={() => setShowAddItemModal(true)}>
                    Add Item
                  </button>
                </div>
                <br />
                <div className="ord-table">
                        <table>
                            <tr>
                                <div className="r-rc">
                                    <th>Orders</th>
                                    <th>Customer</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </div>
                            </tr>

                            {paginatedProducts.map((tx) => (
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
                                        <td className='pp'>
                                            <FaRegEye className='tp-i'/>
                                            <MdOutlineCancel className='tp-i'/>
                                        </td>
                                        {/* <td className='pp pp1'></td> */}
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
            )}

            {/* add item modal */}

            {showAddItemModal && (
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
                        <button className='b-cancel' type="button" onClick={() => setShowAddItemModal(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorService;

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
import { useCreateServiceMutation } from '../../redux-state/api/apiSlice'; // adjust path as needed
import { useGetServicesQuery } from '../../redux-state/api/apiSlice';
import AuthService from '../../services/AuthService';


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


  


const VendorService = ({user, userId}) => {


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

 
const [showAddItemModal, setShowAddItemModal] = useState(false);
const [currentService, setCurrentService] = useState(null);


const [isSubmitting, setIsSubmitting] = useState(false);


const [serviceData, setServiceData] = useState({
  service: '',
  description: '',
  hasPaidItems: false,
});

const [createService, { isLoading, error }] = useCreateServiceMutation();


const handleGenerateSuccess = async () => {
  setIsSubmitting(true);

  const payload = {
    service: serviceData.service,
    description: serviceData.description,
    hasPaidItems: serviceData.hasPaidItems,
  };

  try {

    const result = await createService(serviceData).unwrap();
    console.log('Service created:', result);
    await fetchUserServices();
    setShowModal(true);
  } catch (err) {
    console.error("Service creation error:", err);
    alert("Something went wrong. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};

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


const [userServices, setUserServices] = useState([]);

const [loadingServices, setLoadingServices] = useState(false);

const fetchUserServices = async () => {
  try {
    setLoadingServices(true);
    const services = await AuthService.getUserServices(userData?.user?.id);
    setUserServices(services);

    // ✅ Automatically finalize if service already exists
    if (services && services.length > 0) {
      setServiceFinalized(true);
      setServiceGenerated(false);
    } else {
      setServiceFinalized(false);
    }
  } catch (error) {
    console.error("Failed to fetch services:", error);
  } finally {
    setLoadingServices(false);
  }
};





useEffect(() => {
  if (userData?.user?.id) {
    fetchUserServices();
  }
}, [userData]);

const services = userServices;

const { data } = useGetServicesQuery(userData?.user?.id, { skip: !userData?.user?.id });


const [itemSubmitting, setItemSubmitting] = useState(false);


const [itemData, setItemData] = useState({
  item: '',
  description: '',
  amount: '',
  category: ''
});

const handleSubmitItem = async (e) => {
  e.preventDefault();
  setItemSubmitting(true); // Start loading

  const payload = {
    serviceId: currentService?.id,
    item: itemData.item,
    description: itemData.description,
    amount: Number(itemData.amount),
    category: itemData.category
  };

  try {
    const data = await AuthService.createServiceItem(payload);
    console.log("Item added successfully:", data);

    alert("Item added!");
    setShowAddItemModal(false);
    setItemData({ item: "", description: "", amount: "", category: "" });

  } catch (err) {
    console.error("Error adding item:", err.message);
    alert("Error adding item. Check console.");
  } finally {
    setItemSubmitting(false);
  }
};





  
  if (!userData) return <p>Loading user data...</p>;

  // console.log(userData);
  
  return (
    <div style={{ background: "#fcf9f8" }}>
      
      {/* {user && user.service && user.service.length > 0 ? (
        <ul>
          {user.service.map((serviceItem) => (
            <li key={serviceItem.id}>
              <p><strong>Description:</strong> {serviceItem.description}</p>
              <p><strong>Has Paid Items:</strong> {serviceItem.hasPaidItems ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available.</p>
      )} */}



      <VendorHeader user={userData.user}/>

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
                    <Link to='/dashboard'>
                      <IoArrowBackOutline className='p-back' />
                    </Link>
                    <h3>Service</h3>
                  </div>
                </div>
                <br />
                <div className="product-modal-overlay vendor-service">
                  <div className="modal">
                    <div className='pm-form'>
                      
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
                            className={`toggle-button ${isToggled ? 'toggled' : ''}`} // ✅ Fixed className
                            onClick={() => {
                              const newToggle = !isToggled;
                              setIsToggled(newToggle);
                              setServiceData(prev => ({ ...prev, hasPaidItems: newToggle }));
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
                    </div>
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

            {/* Service LIST */}
            {serviceFinalized && !selectedService && (
              <div>
                <div className="add-btns">
                  <div>
                    <Link to='/dashboard'>
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
                  
                
                {userServices.length > 0 ? (
                  userServices.map((service) => (
                    <div className='product-card service-card' key={service.id} style={{cursor:'pointer'}} onClick={() => {
                      setCurrentService(service);   // This sets the current service
                      setShowAddItemModal(true);   // This opens the modal
                    }}>
                      {/* All usage of 'service' here */}
                      <div className="product1">
                        <div className="pp1-c">
                            <div className="pp-top">
                            <img src={img} alt={service.service} />
                            <div className="pp-txt">
                                <div className="p-name">
                                <h4>{service.service}</h4>
                                <HiDotsHorizontal className='ppp-i'/>
                                </div>
                                {/* <h3>N{service.price.toLocaleString()}</h3> */}
                                <div className="bonus">
                                {/* <p>N{service.oldPrice.toLocaleString()}</p> */}
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
                                <p>No. of sales</p>
                                <div>
                                <LuArrowUp className='rr-i'/>
                                <p>{service.sales}</p>
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
                                <p>{service.remaining}</p>
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
                  ))
                ) : (
                  'No services'
                )}
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

            {showAddItemModal && currentService && (
              <div className="product-modal-overlay">
                <div className="modal">
                  <h2>
                    Add Item to <span className="text-purple-700">{currentService.service}</span>
                  </h2>

                  <form>
                    <div className="image-file">
                      <div className='add-img'>
                        <img src={pro} alt="" />
                        <div>
                          <GoPlus className='plus' />
                          <p>Add product image</p>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Product Category"
                      value={itemData.category}
                      onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
                    />

                    <input
                      type="text"
                      placeholder="Product Name"
                      value={itemData.item}
                      onChange={(e) => setItemData({ ...itemData, item: e.target.value })}
                    />

                    <input
                      type="number"
                      placeholder="Price"
                      value={itemData.amount}
                      onChange={(e) => setItemData({ ...itemData, amount: e.target.value })}
                    />

                    <input
                      type="text"
                      placeholder="Description"
                      value={itemData.description}
                      onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                    />


                    <div className="modal-buttons">
                        <button type="submit" disabled={itemSubmitting} onClick={handleSubmitItem}>
                        {itemSubmitting ? 'Adding...' : 'Add Item'}
                      </button>
                      <button
                        className='b-cancel'
                        type="button"
                        onClick={() => setShowAddItemModal(false)}
                      >
                        Cancel
                      </button>
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

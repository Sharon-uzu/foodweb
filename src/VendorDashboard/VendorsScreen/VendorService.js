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
import { MdDelete } from "react-icons/md";
import Loader from '../VendorsComponents/Loader';




const VendorService = ({user, userId}) => {    
 

  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled(!isToggled);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  

  const [serviceGenerated, setServiceGenerated] = useState(false);
  const handleGenerateService = () => setServiceGenerated(true);
  
  const handleDegenerateService = () => {
    setServiceGenerated(false);
  
    if (userServices.length > 0) {
      // Show existing services
      setServiceFinalized(true);
    } else {
      // No services, show empty state
      setServiceFinalized(false);
    }
  };
  
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


const [openMenuServiceId, setOpenMenuServiceId] = useState(null);
const toggleDropdown = (serviceId) => {
  setOpenMenuServiceId(prev => (prev === serviceId ? null : serviceId));
};


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




  const [selectedServiceItems, setSelectedServiceItems] = useState([]);

  const handleViewService = async (serviceId) => {
    try {
      const items = await AuthService.getServiceItemsByServiceId(serviceId);
      const service = userServices.find(s => s.id === serviceId);
  
      if (!items || items.length === 0) {
        // No items: trigger item modal directly
        setCurrentService(service);
        setShowAddItemModal(true);
      } else {
        // Has items: show detail view
        setSelectedServiceItems(items);
        setSelectedService(service);
      }
  
    } catch (error) {
      console.error(error.message);
      alert("Failed to fetch service items. Check console for details.");
    }
  };
  
  
  const [currentItemPage, setCurrentItemPage] = useState(1);
  const itemsPerPage = 5;
  const totalItemPages = Math.ceil(selectedServiceItems.length / itemsPerPage);

const paginatedItems = selectedServiceItems.slice(
  (currentItemPage - 1) * itemsPerPage,
  currentItemPage * itemsPerPage
);

  const [deletingServiceId, setDeletingServiceId] = useState(null);

const handleDeleteService = async (serviceId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this service?');
  if (!confirmDelete) return;

  setDeletingServiceId(serviceId);
  try {
    await AuthService.deleteService(serviceId);
    await fetchUserServices();
    setDeleteSuccessMessage('Service deleted successfully.');
    setShowDeleteSuccessModal(true);
      } catch (error) {
    console.error('Error deleting scan point:', error);
    alert(`Failed to delete: ${error.message}`);
  } finally {
    setDeletingServiceId(null);
  }
};

 useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate('/signin');
    }
  }, [navigate]);

const deleteService = async (serviceId) => {
  const token = localStorage.getItem('token');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    "serviceId": serviceId
  });  

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch('https://scanorder-server.vercel.app/api/v1/user/delete-service', requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const result = await response.text();
    console.log(result);
    await fetchUserServices();
    alert('Service deleted successfully.');
  } catch (error) {
    console.error('Error deleting service:', error);
    alert(`Failed to delete: ${error.message}`);
  }
};


const handleDeleteItem = async (serviceId, itemId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in.");
    return;
  }

  try {
    const response = await fetch('https://scanorder-server.vercel.app/api/v1/user/delete-service-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ serviceId, itemId })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    handleViewService(serviceId);
    setDeleteSuccessMessage('Item deleted successfully!');
    setShowDeleteSuccessModal(true);

  } catch (error) {
    console.error("Delete item failed:", error);
    alert("Failed to delete item.");
  }
};



useEffect(() => {
  if (showDeleteSuccessModal) {
    const timer = setTimeout(() => {
      setShowDeleteSuccessModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [showDeleteSuccessModal]);



  
if (!userData || loadingServices) {
  return <Loader />;
}

  
  return (
    <div style={{ background: "#fcf9f8" }}>
      
    

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
                    {/* <Link to='/dashboard'>
                      <IoArrowBackOutline className='p-back' />
                    </Link> */}
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
               
                    <div className='product-card service-card' key={service.id}>
                      <div className="product1">
                        <div className="p-top" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                          <h3>{service.service}</h3>
                          <div className="dots-menu" style={{cursor:'pointer', position:'relative'}}>
                            <HiDotsHorizontal onClick={() => toggleDropdown(service.id)} className="menu-icon" />

                            {openMenuServiceId === service.id && (
                              <div className="dropdown-menu">
                                <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleViewService(service.id)}  
                              >
                                <FaRegEye />
                              </div>
                               <div
                                  className="dropdown-item"
                                  onClick={() => {
                                    deleteService(service.id);
                                    // setOpenMenuServiceId(null); 
                                  }}
                                >
                                  <MdDelete/>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <p>{service.description}</p>
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
                            <div className="r-row">

                              <tr className="r-rc">
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Action</th>
                              </tr>
                            </div>


                            {paginatedItems.map(item => (
                                <div className="r-row">

                                  <tr key={item.id} className="r-rc">
                                        <td className="rd">
                                            <img src={img} alt="" />
                                            <div>
                                                <h4>{item.item}</h4>
                                                {/* <p>{item.item}</p> */}
                                            </div>
                                        </td>
                                        <td className='pp'>{item.description}</td>
                                        <td className='pp'>{item.amount}</td>
                                        <td className='pp'>{item.category}</td>
                                        <td className='pp'>
                                            <div
                                              className="delete-btn" style={{cursor:'pointer'}}
                                              onClick={() => handleDeleteItem(selectedService?.id, item.id)}
                                            >
                                              <MdDelete />
                                            </div>
                                        </td>
                                        {/* <td className='pp pp1'></td> */}
                                    
                                  </tr>
                                </div>
                                ))}
                        </table>

                        {/* Pagination */}
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
                            {Array.from({ length: totalItemPages}, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentItemPage(i + 1)}
                                style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                background: currentItemPage === i + 1 ? '#FF7700' : '#eee',
                                color: currentItemPage === i + 1 ? '#fff' : '#000',
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
                          <p>Add Item image</p>
                        </div>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Item Category"
                      value={itemData.category}
                      onChange={(e) => setItemData({ ...itemData, category: e.target.value })}
                    />

                    <input
                      type="text"
                      placeholder="Item Name"
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

            {showDeleteSuccessModal && (
              <div className="modal-overlay scan-modal">
                <div className="modal-content">
                  <div className="m-close">
                    <h3 onClick={() => setShowDeleteSuccessModal(false)}>
                      <IoCloseSharp />
                    </h3>
                  </div>
                  <img className='mark-img' src={img1} alt="success" />
                  <p>{deleteSuccessMessage}</p>
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

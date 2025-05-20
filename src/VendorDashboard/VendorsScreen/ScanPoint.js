import React, { useState, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import AuthService from '../../services/AuthService';
import { QRCodeCanvas } from 'qrcode.react';
import { CiMenuKebab } from "react-icons/ci";
import Loader from '../VendorsComponents/Loader';

const ScanPoint = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);
  const [scanPoints, setScanPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const navigate = useNavigate();


const [loadingScanPoints, setLoadingScanPoints] = useState(true);

  // Check for user authentication
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // Fetch user services
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const userId = storedUserData?.user?.id;
        if (!userId) throw new Error("User ID not found");
    
        const userServices = await AuthService.getUserServices(userId);
        setServices(userServices);
      } catch (err) {
        console.error("Error loading services:", err);
        if (err.message.includes('authentication')) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          navigate('/signin');
        }
      } finally {
        setLoadingServices(false);
      }
    };
    

    if (userData) {
      fetchServices();
    }
  }, [userData, navigate]);

  // Fetch scan points
  const fetchScanPoints = async () => {
    setLoadingScanPoints(true);
    try {
      const points = await AuthService.getScanPoints();
      setScanPoints(points);
    } catch (error) {
      console.error("Failed to fetch scan points:", error);
      if (error.message.includes('authentication')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/signin');
      }
    } finally {
      setLoadingScanPoints(false);
    }
  };
  

  useEffect(() => {
    if (userData) {
      fetchScanPoints();
    }
  }, [userData]);

  // Toggle service selection
  const toggleService = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Handle "assign to all services" toggle
  const handleToggle = () => {
    setIsToggled(prev => !prev);
    if (!isToggled) {
      const allIds = services.map(s => s.id);
      setSelectedServices(allIds);
    } else {
      setSelectedServices([]);
    }
  };

  // Update toggle state when services change
  useEffect(() => {
    const allServiceIds = services.map(service => service.id);
    const allSelected = allServiceIds.length > 0 && allServiceIds.every(id => selectedServices.includes(id));
    setIsToggled(allSelected);
  }, [selectedServices, services]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const payload = {
      title,
      description,
      services: selectedServices,
      allServices: isToggled,
    };

    setLoading(true);
    try {
      await AuthService.createScanPoint(payload);
      await fetchScanPoints();
      
      // Reset form
      setShowModal(false);
      setTitle('');
      setDescription('');
      setSelectedServices([]);
      setIsToggled(false);
      
      alert("Scan point created successfully!");
    } catch (error) {
      console.error("Error creating scan point:", error);
      alert(`Error creating scan point: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const [deletingPointId, setDeletingPointId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // Handle scan point deletion
  const handleDeleteScanPoint = async (scanPointId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this scan point?');
    if (!confirmDelete) return;
  
    setDeletingPointId(scanPointId);
    try {
      await AuthService.deleteScanPoint(scanPointId);
      await fetchScanPoints();
      setShowDeleteModal(true);
      // alert('Scan point deleted successfully.');
    } catch (error) {
      console.error('Error deleting scan point:', error);
      alert(`Failed to delete: ${error.message}`);
    } finally {
      setDeletingPointId(null);
    }
  };
  
  

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpenId(null);
    };

    if (menuOpenId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpenId]);


  // Add this function temporarily to your ScanPoint component for testing
const testDeleteEndpoint = async () => {
  const token = localStorage.getItem('token');
  
  // Test 1: Simple GET request to verify server connectivity
  try {
    const testGet = await fetch('https://scanorder-server.vercel.app/api/v1/user/scan-points', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('GET scan-points status:', testGet.status);
  } catch (error) {
    console.log('GET test failed:', error);
  }

  // Test 2: Test DELETE with a dummy ID (this will fail, but should reach the server)
  try {
    const testDelete = await fetch('https://scanorder-server.vercel.app/api/v1/user/scan-point', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scanPointId: 'test-id' }),
    });
    console.log('DELETE test status:', testDelete.status);
    const result = await testDelete.text();
    console.log('DELETE test response:', result);
  } catch (error) {
    console.log('DELETE test failed:', error);
  }
};

const [loadingServices, setLoadingServices] = useState(false);

const handleDownloadQRCode = (id) => {
  const canvas = document.querySelector(`canvas[data-id="${id}"]`);
  if (canvas) {
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `scan-point-${id}.png`;
    link.click();
  }
};



  // Loading state
  if (!userData || loadingServices || loadingScanPoints) {
    return <Loader />;
  }
  

  return (
    <div>
      <div className="main">
        <VendorsSidebar />
        <div className="main-right">
          <div className="dash-home" style={{ backgroundColor: "transparent" }}>
            {scanPoints.length === 0 ? (
              <div className="scan-point">
                <div className="scan">
                  <div className="sp">
                    <h3>You're yet to generate a scan point</h3>
                    <p>Follow the instructions below to generate a scan point</p>
                    <button onClick={() => setShowModal(true)}>Generate Scan Point</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="scan-point-list">
                <div className="header">
                  <h3>Scan Points</h3>
                  <button style={{cursor:'pointer'}} onClick={() => setShowModal(true)}>Generate Scan Point</button>
                </div>
                <div className='scan-lists'>
                  {scanPoints.map(point => (
                    <div key={point.pointId || point.id} className='scan-lists-div'>
                      <div className='scan-list1'>
                        <div className="s-list-c">
                          <div className="s-menu">
                            <CiMenuKebab
                              className='m-ii'
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpenId(menuOpenId === point.pointId ? null : point.pointId);
                              }}
                              style={{ cursor: 'pointer' }}
                            />

                            {menuOpenId === point.pointId && (
                              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleDownloadQRCode(point.pointId)}>Download</button><br />
                                <button onClick={() => handleDeleteScanPoint(point.pointId)} disabled={deletingPointId === point.pointId}>
                                  {deletingPointId === point.pointId ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            )}


                          </div>
                          
                          <div className="q-line">
                            <QRCodeCanvas 
                              value={`https://scanorder.com/${point.pointId || point.id}`} 
                              style={{ width: '100%' }} 
                              className='qr-code' 
                              data-id={point.pointId || point.id}
                            />
                          </div>
                          
                          <div className='s-l-div' style={{ marginTop: "0.5rem" }}>
                            <h6>{point.title}</h6>  
                            <h6>{point.description}</h6>
                            <h6>ID: {point.pointId}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showModal && (
              <div className="scan-modal-overlay">
                <div className="scan-modal-content">
                  <div className="scan-form">
                    <div className="add-btns">
                      <div>
                        <h3>Generate Scan Point</h3>
                        <IoCloseSharp
                          className="close-icon"
                          onClick={() => {
                            setShowModal(false);
                            setTitle('');
                            setDescription('');
                            setSelectedServices([]);
                            setIsToggled(false);
                          }}
                          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        />
                      </div>
                    </div>
                    <div className="sf">
                      <div className="scan-form-container">
                        <div className="scfc">
                          <label>
                            <p>Title</p>
                            <input
                              type="text"
                              placeholder="Enter title"
                              className="s-inp"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </label>
                          
                          <label>
                            <p>Description</p>
                            <textarea
                              placeholder="Enter description"
                              className="s-inp"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </label>
                          
                          <label>
                            <p>Align a service</p>
                            <div className="align">
                              {services.map(service => (
                                <div className="al1" key={service.id}>
                                  <input
                                    type="checkbox"
                                    checked={selectedServices.includes(service.id)}
                                    onChange={() => toggleService(service.id)}
                                  />
                                  <p>{service.service}</p>
                                </div>
                              ))}
                            </div>
                          </label>
                          
                          <div className="assign">
                            <p>Assign to all services?</p>
                            <div className="toggle-container">
                              <div
                                className={`toggle-button ${isToggled ? 'toggled' : ''}`}
                                onClick={handleToggle}
                              >
                                <div className="toggle-circle"></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="s-btns">
                            <button 
                              onClick={() => {
                                setShowModal(false);
                                setTitle('');
                                setDescription('');
                                setSelectedServices([]);
                                setIsToggled(false);
                              }}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={handleSubmit}
                              disabled={loading}
                            >
                              {loading ? 'Generating...' : 'Generate'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showDeleteModal && (
            <div className="delete-modal-overlay">
              <div className="modal-box">
                <p>Scan point deleted successfully.</p>
                <button onClick={() => setShowDeleteModal(false)}>OK</button>
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
};

export default ScanPoint;
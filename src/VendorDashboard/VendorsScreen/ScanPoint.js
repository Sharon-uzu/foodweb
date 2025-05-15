import React, { useState, useEffect } from 'react';
import VendorsSidebar from '../VendorsComponents/VendorsSidebar';
import { useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import AuthService from '../../services/AuthService';
import { QRCodeCanvas } from 'qrcode.react';
import { CiMenuKebab } from "react-icons/ci";

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

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const userId = storedUserData?.user?.id;
        if (!userId) throw new Error("User ID not found");

        const userServices = await AuthService.getUserServices(userId);
        setServices(userServices);
      } catch (err) {
        console.error("Error loading services:", err);
      }
    };

    fetchServices();
  }, []);

  const toggleService = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleToggle = () => {
    setIsToggled(prev => !prev);
    if (!isToggled) {
      const allIds = services.map(s => s.id);
      setSelectedServices(allIds);
    }
  };

  useEffect(() => {
    const allServiceIds = services.map(service => service.id);
    const allSelected = allServiceIds.length > 0 && allServiceIds.every(id => selectedServices.includes(id));
    setIsToggled(allSelected);
  }, [selectedServices, services]);

  const fetchScanPoints = async () => {
    try {
      const points = await AuthService.getScanPoints();
      setScanPoints(points);
    } catch (error) {
      console.error("Failed to fetch scan points:", error);
    }
  };

  useEffect(() => {
    fetchScanPoints();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Please enter a title.");
    if (!description.trim()) return alert("Please enter a description.");
    if (selectedServices.length === 0) return alert("Please select at least one service.");

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
      setShowModal(false);
      setTitle('');
      setDescription('');
      setSelectedServices([]);
    } catch (error) {
      console.error("Error creating scan point:", error);
      alert("Error creating scan point");
    } finally {
      setLoading(false);
    }
  };

  const [menuOpenId, setMenuOpenId] = useState(null);


  const handleDeleteScanPoint = async (scanPointId) => {
    const confirmed = window.confirm("Are you sure you want to delete this scan point?");
    if (!confirmed) return;
  
    try {
      await AuthService.deleteScanPoint(scanPointId);
      setScanPoints((prev) => prev.filter((point) => point.id !== scanPointId));
      setMenuOpenId(null); // close the menu
      alert("Scan point deleted successfully");
    } catch (error) {
      console.error("Error deleting scan point:", error);
      alert("Failed to delete scan point");
    }
  };
  
  

  if (!userData || !userData.user) return <p>Loading user data...</p>;

  return (
    <div style={{ background: "#fcf9f8" }}>
      <div className="main">
        <VendorsSidebar />
        <div className="main-right">
          <div className="dash-home" style={{ backgroundColor: "transparent" }}>
            {scanPoints.length === 0 ? (
              <div className="scan-point">
                <div className="scan">
                  <div className="sp">
                    <h3>You’re yet to generate a scan point</h3>
                    <p>Follow the instructions below to generate a scan point</p>
                    <button onClick={() => setShowModal(true)}>Generate Scan Point</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="scan-point-list">
                <div className="header">
                  <h3>Scan Points</h3>
                  <button onClick={() => setShowModal(true)}>Generate Scan Point</button>
                </div>
                <div className='scan-lists'>
                {scanPoints.map(point => (
                  <div className='scan-list1' key={point.id}>
                    <div className="s-list-c">
                      <div className="s-menu">
                        <CiMenuKebab
                          className='m-ii'
                          onClick={() => setMenuOpenId(menuOpenId === point.id ? null : point.id)}
                          style={{ cursor: 'pointer' }}
                        />
                        {menuOpenId === point.id && (
                          <div className="dropdown-menu">
                            <button onClick={() => handleDeleteScanPoint(point.id)}>Delete</button>
                          </div>
                        )}
                      </div>
                      <div className="q-line">
                        <QRCodeCanvas value={`https://scanorder.com/${point.id}`} style={{ width: '100%' }} className='qr-code' />
                      </div>
                      <div className='s-l-div' style={{ marginTop: "0.5rem" }}>
                        <h6>{point.title}</h6>  
                        <h6>{point.description}</h6>
                        <h6>{point.pointId}</h6>
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
                          onClick={() => setShowModal(false)}
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
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleSubmit}>
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
        </div>
      </div>
    </div>
  );
};

export default ScanPoint;

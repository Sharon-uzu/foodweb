import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import AdminHeader from '../DashComponents/AdminHeader';
import Sidebar from '../DashComponents/Sidebar';
import Graph from '../DashComponents/Graph';
import History from '../DashComponents/History';
import { Supabase } from '../../config/supabase-config';
import { MdOutlineSendToMobile } from "react-icons/md";
import { TbCheckupList, TbTruckDelivery } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';


const data = [
    { id: 1, order: 10, items: [{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 50 }], number: "ORD12345", date: "2025-03-01", time: "10:30 AM", status: "Pending" },
    { id: 2, order: 10, items: [{ name: "Phone", price: 800 }, { name: "Charger", price: 20 }], number: "ORD12346", date: "2025-03-02", time: "12:45 PM", status: "Delivered" },
    { id: 3, order: 10, items: [{ name: "Headphones", price: 200 }], number: "ORD12347", date: "2025-03-03", time: "2:15 PM", status: "Pending" },
    { id: 4, order: 10, items: [{ name: "Keyboard", price: 150 }, { name: "Monitor", price: 300 }], number: "ORD12348", date: "2025-03-04", time: "4:00 PM", status: "Delivered" },
  ];

const DashHome = ({ userDetails, profileImage }) => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalDeliveries, setTotalDeliveries] = useState(0);
    const [orders, setOrders] = useState([]); // Store orders separately for History component
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => {  
        setSelectedOrder(order);  
    }; 
  
    const closeModal = () => {
      setSelectedOrder(null);
    };
    useEffect(() => {
        if (userDetails?.id) {
            fetchOrdersData(userDetails.id);
        }
    }, [userDetails]);

    const fetchOrdersData = async (adminId) => {  
        try {  
            const { data: ordersData, error } = await Supabase  
                .from('food-web-orders')  
                .select('*, created_at, metadata->>tablenumber as tablenumber')  
                .eq('vendor', adminId); // Ensure we're fetching only the logged-in user's orders  
    
            if (error) throw error;  
    
            // Process orders data  
            const processedOrders = ordersData.map(order => {  
                const createdAt = new Date(order.created_at);  
                return {  
                    ...order,  
                    date: createdAt.toLocaleDateString(), // Format date  
                    time: createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time  
                    items: JSON.parse(order.metadata) // Parse JSON string to get items  
                };  
            });  
    
            setOrders(processedOrders); // Store processed orders for History  
    
            const totalSalesAmount = processedOrders.reduce((acc, order) =>   
                acc + (parseFloat(order.totalprice) || 0), 0  
            );  
    
            const totalDeliveries = processedOrders.filter(order => order.status?.toLowerCase() === 'delivered').length;  
    
            setTotalSales(totalSalesAmount);  
            setTotalOrders(processedOrders.length);  
            setTotalDeliveries(totalDeliveries);  
        } catch (err) {  
            console.error('Error fetching orders:', err.message);  
        }  
    };   

    return (
        <div>
            <AdminHeader userDetails={userDetails} profileImage={profileImage} />

            <div className="main">
                <Sidebar />

                <div className="main-right">
                    <div className="dash-home">
                        <div className="dh-c">
                            <h2>Today’s Sales</h2>
                            <h3>Sales Analytics</h3>

                            <div className="dh-cards">
                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <MdOutlineSendToMobile className='d-icon' />
                                        <p>Total Sales</p>
                                        <h5>₦{totalSales}</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <TbCheckupList className='d-icon' />
                                        <p>Total Order</p>
                                        <h5>{totalOrders}</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <TbTruckDelivery className='d-icon' />
                                        <p>Total Delivery</p>
                                        <h5>{totalDeliveries}</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>

                                <div className="dh-card">
                                    <div className="dh-card-c">
                                        <HiOutlineUsers className='d-icon' />
                                        <p>Total Customers</p>
                                        <h5>20</h5>
                                        <p>+8% from yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='chart'>
                        <h3>Customer's Satisfaction</h3>
                        <Graph />
                    </div>

                    {/* Order Table */}
                    <div className="history-table">
                    <div className="table-container">
                        <h2 className="table-title">Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="styled-table">
                            <thead>
                                <tr>
                                <th>Order No.</th>
                                <th>Items</th>
                                <th>Number</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>  
                                {orders.map((order) => (  
                                    <tr key={order.id}>  
                                        <td>{order.id}</td>  
                                        <td>  
                                            {order.items ? order.items.map(item => (  
                                                <div key={item.foodname}>  
                                                    {item.foodname} (Qty: {item.quantity})  
                                                </div>  
                                            )) : "N/A"}  
                                        </td>  
                                        <td>{order.tablenumber}</td>
                                        <td>{order.date}</td> 
                                        <td>{order.time}</td>  
                                        <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>  
                                        <td>  
                                            <button className="action-btn" onClick={() => openModal(order)}>View</button>  
                                        </td>  
                                    </tr>  
                                ))}  
                            </tbody>   

                            </table>
                        </div>

                        {/* Modal */}
                        {selectedOrder && (  
                            <div className="table-overlay">  
                                <div className="t-modal-content">  
                                    <h2>Order Details</h2>  
                                    <p><strong>Order No.:</strong> {selectedOrder.id}</p> {/* Ensure correct order ID */}  
                                    <p><strong>Table Number:</strong> {selectedOrder.tablenumber}</p> {/* Use tablenumber fetched from metadata */}  
                                    <p><strong>Date:</strong> {selectedOrder.date}</p>  
                                    <p><strong>Time:</strong> {selectedOrder.time}</p>  
                                    <p><strong>Status:</strong> <span className={`status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>  

                                    <h3>Items Ordered:</h3>  
                                    <ul className="items-list">  
                                    {selectedOrder.items.map((item, index) => (  
                                        <li key={index}>  
                                            {item.foodname} - Quantity: {item.quantity},  Price: {item.foodprice} {/* Use foodprice and quantity to calculate total */}  
                                        </li>  
                                    ))}  
                                    </ul>  

                                    <h3>Total Amount: <span className="total-price">  
                                    ${selectedOrder.items.reduce((sum, item) => sum + (item.foodprice * item.quantity), 0).toFixed(2)} {/* Calculate total based on foodprice and quantity */}  
                                    </span></h3>  

                                    <button className="close-btn" onClick={closeModal}>Close</button>  
                                </div>  
                            </div>  
                        )}  

                        
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashHome;

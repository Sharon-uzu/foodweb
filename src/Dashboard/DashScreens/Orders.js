import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer'
import AdminHeader from '../DashComponents/AdminHeader'
import Sidebar from '../DashComponents/Sidebar'
import OrderDoughnutChart from "../DashComponents/OrderDoughnutChart ";
import DeliveryTable from "../DashComponents/DeliveryTable";
import History from "../DashComponents/History";
import { Supabase } from '../../config/supabase-config';
import { FaCaretDown } from 'react-icons/fa'; // Ensure you have react-icons installed  

const initialData = [  
    { id: 1, order: 2, items: "Laptop, Mouse", number: "ORD12345", price: 200, status: "Pending" },  
    { id: 2, order: 2, items: "Phone, Charger", number: "ORD12346", price: 120, status: "Delivered" },  
    { id: 3, order: 2, items: "Headphones", number: "ORD12347", price: 310, status: "Pending" },  
    { id: 4, order: 2, items: "Keyboard, Monitor", number: "ORD12348", price: 85, status: "Delivered" },  
]; 


const Orders = ({ userDetails}) => {
    const [showDeliveryConfirmation, setShowDeliveryConfirmation] = useState(false);
// const deliveredCount = ordersData.filter(order => order.status && order.status.toLowerCase() === "delivered").length;  
// const pendingCount = ordersData.filter(order => order.status && order.status.toLowerCase() === "pending").length;  
    const orderData = [
        { month: "January", totalOrders: 120, deliveredOrders: 90, pendingOrders: 30 },
        { month: "February", totalOrders: 150, deliveredOrders: 120, pendingOrders: 30 },
        { month: "March", totalOrders: 180, deliveredOrders: 150, pendingOrders: 30 },
    ];

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
    
    const [data, setData] = useState(initialData);  
    const [showDropdown, setShowDropdown] = useState({});  


    // Function to toggle dropdown for specific order  
    const toggleDropdown = (orderId) => {  
        setShowDropdown((prev) => ({  
            ...prev,  
            [orderId]: !prev[orderId],  // Toggle the dropdown for the specific order  
        }));  
    };   

    const handleStatusChange = async (order) => {  
        try {  
            // Update the status in the Supabase database  
            const { error } = await Supabase  
                .from('food-web-orders')  
                .update({ status: 'delivered' })  
                .eq('id', order.id); // Update by the order ID  
    
            if (error) throw error;  
    
            // Update local state  
            setOrders((prevOrders) =>   
                prevOrders.map((item) =>   
                    item.id === order.id ? { ...item, status: 'Delivered' } : item  
                )  
            );  
    
            // Hide dropdown after confirming  
            setShowDropdown((prev) => ({ ...prev, [order.number]: false }));  
        } catch (error) {  
            console.error("Error updating order status:", error.message);  
        }  
    };  

    return (
        <div>
            <AdminHeader userDetails={userDetails}/>
            <div className="main">
                <Sidebar />
                <div className="main-right">
                    <div className="meals">
                        <div className="meals-c">
                        {!showDeliveryConfirmation ? (
                            <>
                            <h2>Customer Orders</h2>
                            <p>Welcome to the Admin Dashboard! Below you’ll find a list of all current customer orders. Each order includes details such as the customer’s table ID, item price, order status, and the items they’ve selected.</p>

                                    <div className="order-charts">
                                        <div className="ord-c">
                                            <OrderDoughnutChart dataByMonth={orderData} />
                                        </div>
                                    </div>
                                    <div className="history-table order-table">
                                        <div className="table-container">
                                            <div className="meals-top">
                                                {/* <h3>Orders</h3> */}
                                                <button onClick={() => setShowDeliveryConfirmation(true)}>Click to Deliver</button>
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
                                </>
                            ) : (
                                <div className="delivery-confirmation">
                                    <button onClick={() => setShowDeliveryConfirmation(false)} style={{cursor:'pointer'}}>Go Back</button>

                                    <h2>Orders</h2>
                                    <p>These orders are to be delivered to the respective tables</p>

                                    <div>  
                                        <div className="history-table order-table">  
                                            <div className="table-container">  
                                                <div className="overflow-x-auto">  
                                                    <table className="styled-table">  
                                                        <thead>  
                                                            <tr>  
                                                                <th>Order no.</th>  
                                                                <th>Items</th>  
                                                                <th>Table ID</th>  
                                                                <th>Price</th>  
                                                                <th>Status</th>  
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
                                                                <td>₦{order.totalprice}</td> 
                                                                <td className={`status ${order.status.toLowerCase()}`}>  
                                                                    <span>{order.status}</span>  
                                                                    {order.status === "pending" && (  
                                                                        <div style={{ display: 'inline-block', position: 'relative' }}>  
                                                                            <FaCaretDown   
                                                                                onClick={() => toggleDropdown(order.id)}  // Pass order id to toggleDropdown  
                                                                                style={{ cursor: 'pointer', marginLeft: '10px' }}   
                                                                            />  
                                                                            {showDropdown[order.id] && (  // Check visibility state for this specific order id  
                                                                                <div className="dropdown-popup" style={{  
                                                                                    position: 'absolute',  
                                                                                    backgroundColor: 'white',  
                                                                                    border: '1px solid #ccc',  
                                                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',  
                                                                                    zIndex: 1,  
                                                                                    padding: '10px',  
                                                                                    marginTop: '5px',  
                                                                                }}>  
                                                                                    <p>Are you sure you want to confirm delivery?</p>  
                                                                                    <button  
                                                                                        onClick={() => handleStatusChange(order)}  // Update status for this specific order  
                                                                                        style={{ marginRight: '5px' }}  
                                                                                    >  
                                                                                        Confirm  
                                                                                    </button>  
                                                                                    <button onClick={() => toggleDropdown(order.id)}>  
                                                                                        Cancel  
                                                                                    </button>  
                                                                                </div>  
                                                                            )}  
                                                                        </div>  
                                                                    )}  
                                                                </td>      
                                                            </tr>  
                                                        ))}
                                                            {/* {orders.map((order) => (  
                                                                <tr key={order.id}>  
                                                                    <td>{item.order}</td>  
                                                                    <td>{order.id}</td>  
                                                                    <td>  
                                                                        {order.items ? order.items.map(item => (  
                                                                            <div key={item.foodname}>  
                                                                                {item.foodname} (Qty: {item.quantity})  
                                                                            </div>  
                                                                        )) : "N/A"}  
                                                                    </td>  
                                                                    <td>{order.tablenumber}</td>  
                                                                    <td>${order.price}</td>  
                                                                    <td className={`status ${order.status.toLowerCase()}`}>  
                                                                        <span>{order.status}</span>  
                                                                        {order.status === "Pending" && (  
                                                                            <div style={{ display: 'inline-block', position: 'relative' }}>  
                                                                                <FaCaretDown   
                                                                                    onClick={() => toggleDropdown(order.number)}   
                                                                                    style={{ cursor: 'pointer', marginLeft: '10px' }}   
                                                                                />  
                                                                                {showDropdown[order.number] && (  
                                                                                    <div className="dropdown-popup" style={{  
                                                                                        position: 'absolute',  
                                                                                        backgroundColor: 'white',  
                                                                                        border: '1px solid #ccc',  
                                                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',  
                                                                                        zIndex: 1,  
                                                                                        padding: '10px',  
                                                                                        marginTop: '5px',  
                                                                                    }}>  
                                                                                        <p>Are you sure you want to confirm delivery?</p>  
                                                                                        <button  
                                                                                            onClick={() => handleStatusChange(item.number)}  
                                                                                            style={{ marginRight: '5px' }}  
                                                                                        >  
                                                                                            Confirm  
                                                                                        </button>  
                                                                                        <button onClick={() => toggleDropdown(item.number)}>  
                                                                                            Cancel  
                                                                                        </button>  
                                                                                    </div>  
                                                                                )}  
                                                                            </div>  
                                                                        )}  
                                                                    </td>  
                                                                </tr>  
                                                            ))}   */}
                                                        </tbody>  
                                                    </table>  
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
            <Footer />
        </div>
    );
};

export default Orders;

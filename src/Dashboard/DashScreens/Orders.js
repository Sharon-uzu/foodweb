import React, { useState } from "react";
import Footer from '../../Components/Footer'
import AdminHeader from '../DashComponents/AdminHeader'
import Sidebar from '../DashComponents/Sidebar'
import OrderDoughnutChart from "../DashComponents/OrderDoughnutChart ";
import DeliveryTable from "../DashComponents/DeliveryTable";
import History from "../DashComponents/History";

const data = [
    { id: 1, customer: "John Doe", items: "Laptop, Mouse", number: "ORD12345", price: 200, status: "Pending" },
    { id: 2, customer: "Jane Smith", items: "Phone, Charger", number: "ORD12346", price: 120, status: "Delivered" },
    { id: 3, customer: "Alice Johnson", items: "Headphones", number: "ORD12347", price: 310, status: "Pending" },
    { id: 4, customer: "Bob Brown", items: "Keyboard, Monitor", number: "ORD12348", price: 85, status: "Delivered" },
];

const Orders = () => {
    const [showDeliveryConfirmation, setShowDeliveryConfirmation] = useState(false);

    const orderData = [
        { month: "January", totalOrders: 120, deliveredOrders: 90, pendingOrders: 30 },
        { month: "February", totalOrders: 150, deliveredOrders: 120, pendingOrders: 30 },
        { month: "March", totalOrders: 180, deliveredOrders: 150, pendingOrders: 30 },
    ];

    return (
        <div>
            <AdminHeader />
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
                                            <History/>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="delivery-confirmation">
                                    <button onClick={() => setShowDeliveryConfirmation(false)} style={{cursor:'pointer'}}>Go Back</button>

                                    <h2>Orders</h2>
                                    <p>These orders are to be delivered to the respective tables</p>

                                    <DeliveryTable/>
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

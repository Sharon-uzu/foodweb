import React, { useState } from 'react';  
import { FaCaretDown } from 'react-icons/fa'; // Ensure you have react-icons installed  

const initialData = [  
    { id: 1, customer: "John Doe", items: "Laptop, Mouse", number: "ORD12345", price: 200, status: "Pending" },  
    { id: 2, customer: "Jane Smith", items: "Phone, Charger", number: "ORD12346", price: 120, status: "Delivered" },  
    { id: 3, customer: "Alice Johnson", items: "Headphones", number: "ORD12347", price: 310, status: "Pending" },  
    { id: 4, customer: "Bob Brown", items: "Keyboard, Monitor", number: "ORD12348", price: 85, status: "Delivered" },  
];  

const DeliveryTable = () => {  
    const [data, setData] = useState(initialData);  
    const [showDropdown, setShowDropdown] = useState({});  

    const handleStatusChange = (number) => {  
        setData((prevData) =>  
            prevData.map((item) =>   
                item.number === number ? { ...item, status: "Delivered" } : item  
            )  
        );  
        setShowDropdown((prev) => ({ ...prev, [number]: false })); // Hide dropdown after confirming  
    };  

    const toggleDropdown = (number) => {  
        setShowDropdown((prev) => ({ ...prev, [number]: !prev[number] }));  
    };  

    return (  
        <div>  
            <div className="history-table order-table">  
                <div className="table-container">  
                    <div className="overflow-x-auto">  
                        <table className="styled-table">  
                            <thead>  
                                <tr>  
                                    <th>Customer</th>  
                                    <th>Items</th>  
                                    <th>Table ID</th>  
                                    <th>Price</th>  
                                    <th>Status</th>  
                                </tr>  
                            </thead>  
                            <tbody>  
                                {data.map((item) => (  
                                    <tr key={item.number}>  
                                        <td>{item.customer}</td>  
                                        <td>{item.items}</td>  
                                        <td>{item.number}</td>  
                                        <td>${item.price}</td>  
                                        <td className={`status ${item.status.toLowerCase()}`}>  
                                            <span>{item.status}</span>  
                                            {item.status === "Pending" && (  
                                                <div style={{ display: 'inline-block', position: 'relative' }}>  
                                                    <FaCaretDown   
                                                        onClick={() => toggleDropdown(item.number)}   
                                                        style={{ cursor: 'pointer', marginLeft: '10px' }}   
                                                    />  
                                                    {showDropdown[item.number] && (  
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
                                ))}  
                            </tbody>  
                        </table>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default DeliveryTable;  
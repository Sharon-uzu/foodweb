import React, { useState } from "react";

const data = [
  { id: 1, customer: "John Doe", items: [{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 50 }], number: "ORD12345", date: "2025-03-01", time: "10:30 AM", status: "Pending" },
  { id: 2, customer: "Jane Smith", items: [{ name: "Phone", price: 800 }, { name: "Charger", price: 20 }], number: "ORD12346", date: "2025-03-02", time: "12:45 PM", status: "Delivered" },
  { id: 3, customer: "Alice Johnson", items: [{ name: "Headphones", price: 200 }], number: "ORD12347", date: "2025-03-03", time: "2:15 PM", status: "Pending" },
  { id: 4, customer: "Bob Brown", items: [{ name: "Keyboard", price: 150 }, { name: "Monitor", price: 300 }], number: "ORD12348", date: "2025-03-04", time: "4:00 PM", status: "Delivered" },
];

const History = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Orders</h2>
      <div className="overflow-x-auto">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.number}>
                <td>{item.customer}</td>
                <td>{item.items.map(i => i.name).join(", ")}</td>
                <td>{item.number}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
                <td>
                  <button className="action-btn" onClick={() => openModal(item)}>
                    View
                  </button>
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
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Order Number:</strong> {selectedOrder.number}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Time:</strong> {selectedOrder.time}</p>
            <p><strong>Status:</strong> <span className={`status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>

            <h3>Items Ordered:</h3>
            <ul className="items-list">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - <span className="price">${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <h3>Total Amount: <span className="total-price">
              ${selectedOrder.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </span></h3>

            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default History;

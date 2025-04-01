import React from 'react'
import Footer from '../../Components/Footer'
import AdminHeader from '../DashComponents/AdminHeader'
import Sidebar from '../DashComponents/Sidebar';


const data = [
    { id: 1, name: "John Doe", email: "john@gmail.com", phone: "0912345678", address: "#2 Woji, PH"},
    { id: 2, name: "Jane Smith", email: "jane@gmail.com", phone: "0912345678", address: "#2 Woji, PH" },
    { id: 3, name: "Alice Johnson", email: "alice@gmail.com", phone: "0912345678", address: "#2 Woji, PH"},
    { id: 4, name: "Bob Brown", email: "bob@gmail.com", phone: "0912345678", address: "#2 Woji, PH"},
  ];
const Users = ({ userDetails}) => {
  return (
        <div>
            <AdminHeader userDetails={userDetails}/>

            <div className="main">
                <Sidebar/>

                <div className="main-right">
            

                    <div className="history-table user-table">
                        <div className="table-container">
                            <h2 className="table-title">Users</h2>
                            <div className="overflow-x-auto">
                                <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                    <tr key={item.number}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <Footer />
        </div>
  )
}

export default Users
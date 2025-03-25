import React, { useState, useEffect } from "react";  
import { useLocation, Link } from "react-router-dom";  
import { MdDeleteOutline } from "react-icons/md";  
import { IoMdAdd } from "react-icons/io";  
import { FiMinus } from "react-icons/fi";  
import Wanted from '../Components/Wanted';  
import { useCart } from "../CartContext";  
import { Supabase } from '../config/supabase-config';  
import { IoIosArrowBack } from "react-icons/io";  
import Modal from "../Dashboard/DashComponents/Modal";
import { useNavigate } from "react-router-dom";  


const Cart = () => {  

    const navigate = useNavigate();
    const { pathname } = useLocation();  
    const { cart, updateCart, removeFromCart, clearCart } = useCart();  
    const [loading, setLoading] = useState(false);
    const [tableNumbers, setTableNumbers] = useState([]);  
    const [selectedTable, setSelectedTable] = useState('');  
    const [displaySelectTable, setDisplaySelectTable] = useState(false); // State to show select table dropdown  
    // const [tableData, setTableData] = useState(null); // State for table specific information  
    const [modalVisible, setModalVisible] = useState(false);   
    const [modalMessage, setModalMessage] = useState(''); 
    const [tableData, setTableData] = useState([]);  


    useEffect(() => {  
        window.scrollTo(0, 0);  
        document.body.style.overflow = "auto";  
    }, [pathname]);  

    useEffect(() => {  
        // Check if cart is not empty, extract adminId and fetch tables  
        if (cart.length > 0) {  
            const adminId = cart[0].adminid;   
            fetchTableNumbers(adminId);  
        }  
    }, [cart]);  

    // useEffect(() => {  
    //     const query = new URLSearchParams(window.location.search);  
    //     const table = query.get('table');  

    //     if (table === "false") {  
    //         setDisplaySelectTable(true); // Show the select table dropdown if table is "false"  
    //     } else if (table) {  
    //         setDisplaySelectTable(false); // Hide the select table dropdown if any other valid table value  
    //         fetchTableData(table); // Fetch data for that specific table  
    //     } else {  
    //         setDisplaySelectTable(false); // If no table param, hide this section  
    //     }  
    // }, [pathname]); // React if the pathname changes  

    useEffect(() => {  
        const query = new URLSearchParams(window.location.search);  
        const table = query.get('table');  
    
        // Show the select table dropdown if table is "false"  
        if (table === "false") {  
            setDisplaySelectTable(true);  
            setSelectedTable('');  // Optionally reset selectedTable when showing the dropdown  
        } else if (table && table !== "false") {  
            setDisplaySelectTable(false);  
            fetchTableData(table);  
        } else {  
            setDisplaySelectTable(false);  
            setSelectedTable('');  // Reset selectedTable if no table param is present  
        }  
    }, [pathname, tableNumbers]);  
    const fetchTableNumbers = async (adminId) => {  
        try {  
            const { data, error } = await Supabase  
                .from('food-web-tables')  
                .select('tablename, tablenumber')  
                .eq('adminid', adminId);  
    
            if (error) throw error;  
    
            const uniqueTables = data.map(table => `${table.tablename} - ${table.tablenumber}`);  
            setTableNumbers(uniqueTables);  
        } catch (error) {  
            console.error('Error fetching tables:', error.message);  
        }  
    };  


// Fetch table data function remains with minimal modification  
const fetchTableData = async (tableNumber) => {  
    try {  
        const { data, error } = await Supabase  
            .from('food-web-tables')  
            .select('*')  
            .eq('tablenumber', tableNumber);  
    
        if (error) throw error;  

        // Store fetched table info, should always be an array  
        setTableData(data);  
        if (data && data.length > 0) {  
            setSelectedTable(data[0].tablename);   
        } else {  
            setSelectedTable('');  
        }  
    } catch (error) {  
        console.error('Error fetching table data:', error.message);  
        setTableData([]);  // Keep this as an empty array  
        setSelectedTable('');  
    }  
};     

    const increment = (id) => {  
        const updatedCart = cart.map((item) =>  
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item  
        );  
        updateCart(updatedCart);  
    };  

    const decrement = (id) => {  
        const updatedCart = cart.map((item) =>  
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item  
        );  
        updateCart(updatedCart);  
    };  

    const totalAmount = cart.reduce((acc, item) => acc + (Number(item.mealprice) || 0) * (item.quantity || 1), 0);  

    const placeOrder = async () => {  
        let tableName = "";
        let tableNumber = "";
    
        if (displaySelectTable) {  
            // When using dropdown selection
            if (!selectedTable) {  
                console.log("No table selected, showing modal.");  
                setModalMessage("Please select a table before placing your order.");  
                setModalVisible(true);  
                return;  
            }  
            const tableParts = selectedTable.split(' - ');  
            tableName = tableParts[0];  
            tableNumber = tableParts.length > 1 ? tableParts[1] : '';  
        } else {  
            // When using fetched table data  
            if (tableData.length > 0) {  
                tableName = tableData[0].tablename;  
                tableNumber = tableData[0].tablenumber;  
            }  
        }  
    
        const metadata = cart.map(item => ({  
            foodname: item.mealname,  
            foodcategory: item.category,  
            foodprice: item.mealprice,  
            quantity: item.quantity,  
        }));  
    
        const orderData = {  
            vendor: cart[0].adminid,  
            tablename: tableName,  
            tablenumber: tableNumber,  
            status: 'pending',  
            metadata: JSON.stringify(metadata),  
            totalprice: totalAmount,  
        };  
    
        console.log("Final Order Data:", orderData); // Debugging log
    
        try {  
            setLoading(true);  
            const { error } = await Supabase  
                .from('food-web-orders')  
                .insert([orderData]);  
    
            if (error) throw error;  
    
            cart.forEach(item => removeFromCart(item.id));  
    
            setModalMessage("Your order has been placed successfully!");  
            setModalVisible(true);  
            setSelectedTable('');  
            clearCart();
    
            setTimeout(() => {  
                navigate('/ordersuccess');  
            }, 2000);   
        } catch (error) {  
            console.error('Error placing order:', error.message);  
            setModalMessage("There was an error placing your order. Please try again.");  
            setModalVisible(true);  
        } finally {  
            setLoading(false);  
        }  
    };  
        

    // Handle closing the modal  
    const handleCloseModal = () => {  
        setModalVisible(false);   
    };   

    return (  
        <div>  
            <Modal   
            isOpen={modalVisible}   
            onClose={handleCloseModal}   
            message={modalMessage}   
        /> 
            <div className="search-header header2">  
                <div className="shc">  
                    <h4>  
                        <Link to='/'><IoIosArrowBack className="s-ii" /></Link>  
                        Cart  
                    </h4>  
                </div>  
            </div>  

            <div className="carts">  
                <div className="cart-l">  
                    {cart.length === 0 ? (  
                        <p style={{ marginBottom: '30px' }}>Your cart is empty.</p>  
                    ) : (  
                        cart.map((item) => (  
                            <div className="cart1" key={item.id}>  
                                <div className="cart1-c">  
                                    <div className="cart-flex">  
                                        <div className="cart-img">  
                                            <img src={item.image} alt={item.mealname} />  
                                            <div>  
                                                <p>{item.business}</p>  
                                                <p><span>Category:</span>{item.category}</p>  
                                                <h6>{item.mealname}</h6>  
                                            </div>  
                                        </div>  
                                        <div className="cart-price">  
                                            <h5><span>N{Number(item.mealprice) + 1500}</span> N{(Number(item.mealprice) || 0) * item.quantity}</h5>  
                                            <div className="increment">  
                                                <div onClick={() => decrement(item.id)}><FiMinus className='i-i' /></div>  
                                                <span>{item.quantity}</span>  
                                                <div className='colored' onClick={() => increment(item.id)}><IoMdAdd className='i-i' /></div>  
                                            </div>  
                                        </div>  
                                    </div>  
                                    <div className="delete" onClick={() => removeFromCart(item.id)}>  
                                        <div className="del">  
                                            <MdDeleteOutline className='del-i' />  
                                        </div>  
                                        <p>Remove</p>  
                                    </div>  
                                </div>  
                            </div>  
                        ))  
                    )}  
                </div>  

                <div className="cart-r">  
                    {cart.length === 0 ? null : (  
                        <div className="cart-d">  
                            <div className="cart-s">  
                                <h5>Cart Summary</h5>  
                                <div className="total">  
                                    <div>  
                                        <p>Subtotal</p>  
                                        <h4>N{totalAmount}</h4>  
                                    </div>  
                                    <div>  
                                        <p>Total</p>  
                                        <h4>N{totalAmount}</h4>  
                                    </div>  
                                </div>  

                                {displaySelectTable ? (  
                                    <div>  
                                        <h5>Select Table</h5>  
                                        <div>  
                                            <select   
                                                value={selectedTable}   
                                                onChange={(e) => setSelectedTable(e.target.value)}  
                                            >  
                                                <option value="">Select Table</option>  
                                                {tableNumbers.length > 0 ? (  
                                                    tableNumbers.map((table, index) => (  
                                                        <option key={index} value={table}>{table}</option>  
                                                    ))  
                                                ) : (  
                                                    <option value="">No tables available</option>  
                                                )}  
                                            </select>  
                                        </div>  
                                    </div>  
                                ) : tableData.length > 0 ? (  // Check if tableData is an array and has elements  
                                    <div className="table-info">  
                                        <h5>Table Information</h5>  
                                        <div className="table-display">  
                                            <p>Table Name: {tableData[0].tablename}</p>  
                                            <p>Table Number: {tableData[0].tablenumber}</p>  
                                        </div>  
                                    </div>  
                                ) : null}       
                                <button   
                                    style={{ cursor: 'pointer' }}   
                                    onClick={placeOrder}   
                                    // Remove the disabled attribute  
                                >  
                                    {loading ? 'Placing Order...' : 'Place Order'}  
                                </button>      
    
                            </div>  
                        </div>  
                    )}  

                     
                </div> 

                 

            </div>  

            <Wanted />  
        </div>  
    );  
};  
export default Cart;  
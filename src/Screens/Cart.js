import React, { useState, useEffect } from "react";  
import { useLocation, Link } from "react-router-dom";  
import { MdDeleteOutline } from "react-icons/md";  
import { IoMdAdd } from "react-icons/io";  
import { FiMinus } from "react-icons/fi";  
import Wanted from '../Components/Wanted';  
import { useCart } from "../CartContext";  
import { Supabase } from '../config/supabase-config';  
import { IoIosArrowBack } from "react-icons/io";  

const Cart = () => {  
    const { pathname } = useLocation();  
    const { cart, updateCart, removeFromCart } = useCart();  

    const [tableNumbers, setTableNumbers] = useState([]);  
    const [selectedTable, setSelectedTable] = useState('');  
    const [displaySelectTable, setDisplaySelectTable] = useState(false); // State to show select table dropdown  
    const [tableData, setTableData] = useState(null); // State for table specific information  

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

    useEffect(() => {  
        const query = new URLSearchParams(window.location.search);  
        const table = query.get('table');  

        if (table === "false") {  
            setDisplaySelectTable(true); // Show the select table dropdown if table is "false"  
        } else if (table) {  
            setDisplaySelectTable(false); // Hide the select table dropdown if any other valid table value  
            fetchTableData(table); // Fetch data for that specific table  
        } else {  
            setDisplaySelectTable(false); // If no table param, hide this section  
        }  
    }, [pathname]); // React if the pathname changes  

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

    const fetchTableData = async (tableNumber) => {  
        // Fetch specific table data based on table number  
        try {  
            const { data, error } = await Supabase  
                .from('food-web-tables')  
                .select('*')  
                .eq('tablenumber', tableNumber); // Adjust as necessary  

            if (error) throw error;  

            setTableData(data); // Store fetched table info  
        } catch (error) {  
            console.error('Error fetching table data:', error.message);  
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

    return (  
        <div>  
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
                                <button>Order</button>  
                            </div>  
                        </div>  
                    )}  

                    <div className="cart-d">  
                        <div className="cart-s">  
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
                                    <button>Done</button>  
                                </div>  
                            ) : tableData ? (  
                                <div className="table-info">  
                                    <h5>Table Information</h5>  
                                    {tableData.map((table, index) => (  
                                        <div key={index} className="table-display">  
                                            <p>Table Name: {table.tablename}</p>  
                                            <p>Table Number: {table.tablenumber}</p>  
                                        </div>  
                                    ))}  
                                </div>  
                            ) : null}  
                        </div>  
                    </div>  
                </div>  
            </div>  

            <Wanted />  
        </div>  
    );  
};  
export default Cart;  
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";import Header from '../Components/Header';
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Wanted from '../Components/Wanted';
import Footer from '../Components/Footer';
import { useCart } from "../CartContext";

const Cart = () => {

    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
  }, [pathname]);

  
    const { cart, updateCart, removeFromCart } = useCart();
  

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

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <Header />

            <div className="carts">
                <div className="cart-l">
                    {cart.length === 0 ? (
                        <p style={{marginBottom:'30px'}}>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div className="cart1" key={item.id}>
                                <div className="cart1-c">
                                    <div className="cart-flex">
                                        <div className="cart-img">
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                <p>{item.name}</p>
                                                <p><span>Category:</span>{item.category}</p>
                                                <h6>{item.name}</h6>
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            <h5><span>N{item.price + 1500}</span>N{item.price * item.quantity}</h5>
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


                {cart.length === 0 ? (
                        null
                    ) : (
                    <div className="cart-r">
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
            </div>

            <Wanted />
            <Footer />
        </div>
    );
};

export default Cart;

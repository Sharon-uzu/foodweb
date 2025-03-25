import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext'; 
import logo from '../Assets/ScanOrder logo pdf.png';
import { HiOutlineHome } from "react-icons/hi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const Header = () => {
    const location = useLocation(); 
    const { cart } = useCart();

    return (
        <div>
            <header className='m-header'>
                <nav>
                    <Link to='/'><img src={logo} alt="Logo" /></Link>

                    <ul>
                        <form>
                            <div className="inp">
                                <CiSearch className='f-i'/>
                                <input type="search" name="" id="" />
                            </div>
                            <button>Search</button>
                        </form>

                        <Link to='/' className={`h-group ${location.pathname === '/' ? 'active' : ''}`}>
                            <HiOutlineHome className='h-i'/>
                            <span>Home</span>
                        </Link>

                        <Link to='/help' className={`h-group ${location.pathname === '/help' ? 'active' : ''}`}>
                            <IoIosHelpCircleOutline className='h-i'/>
                            <span>Help</span>
                        </Link>


                        <Link to='/cart?table=false' className={`h-group ${location.pathname === '/cart' ? 'active' : ''}`}>
                            <AiOutlineShoppingCart className='h-i'/>
                            <span>Cart</span>
                            <span className="cart-count">{cart.length}</span> {/* Now correctly displays number of items */}
                        </Link>

                    </ul>

                    {/* <div className="search-header">
                        <div className="search">
                            <CiSearch className='sh-i'/>
                            <input type="search" placeholder='Search' />
                        </div>
                        <button>Search</button>
                    </div> */}

                    {/* Fixed Menu */}
                    <div className="fixed-menu">
                        <div className="f-menu">
                            <div className="fm-c">
                                <Link to='/' className={`h-group ${location.pathname === '/' ? 'active' : ''}`}>
                                    <HiOutlineHome className='h-i'/>
                                    <span>Home</span>
                                </Link>


                                <Link to='/cart?table=false' className={`h-group ${location.pathname === '/cart' ? 'active' : ''}`}>
                                    <AiOutlineShoppingCart className='h-i'/>
                                    <span>Cart</span>
                                    <span className="cart-count c-counts">{cart.length}</span> {/* Now correctly displays number of items */}
                                </Link>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;

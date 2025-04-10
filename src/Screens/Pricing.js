import React, { useState } from 'react';
import Header from '../Components/Header'
import { FaRegCheckSquare } from "react-icons/fa";
import { LuCircleCheckBig } from "react-icons/lu";
import img from '../Assets/l.png'
import img1 from '../Assets/l1.png'
import img2 from '../Assets/l2.png'
import img3 from '../Assets/l3.png'
import img4 from '../Assets/l4.png'
import Faq from '../Components/Faq';
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom';


const Pricing = () => {

    const [billing, setBilling] = useState('monthly');

    const handleToggle = (mode) => {
      setBilling(mode);
    };
  
    const prices = {
      silver: billing === 'monthly' ? 'N10,000/month' : 'N108,000/year',
      gold: billing === 'monthly' ? 'N15,000/month' : 'N162,000/year',
      diamond: billing === 'monthly' ? 'N25,000/month' : 'N270,000/year',
    };

  return (
    <div>
        <Header/>
        <div className="pricing">
            <div className="price">
                <h2>"<span>Transparent</span> Pricing, No <span>Surprises</span> – Find the <span>Perfect</span> Plan for Your Business!"</h2>
                <p className='p'>Unlock special offers and promotions available only to members.</p>
                <div className="time">
                    <button
                    className={billing === 'monthly' ? 'ac' : ''}
                    onClick={() => handleToggle('monthly')}
                    >
                    Monthly
                    </button>
                    <button
                    className={billing === 'yearly' ? 'ac' : ''}
                    onClick={() => handleToggle('yearly')}
                    >
                    Yearly 10% off
                    </button>
                </div>


                <div className="plan-cards">

                    <div className="plans">
                        <div className="plan">
                            <h4>Silver Plan (Starter)</h4>
                            <h3>{prices.silver}</h3>
                            <p className='pp'>For small restaurants, cafés, and food vendors starting with digital ordering.</p>
                            <Link to='/signin'><button>Buy Now</button></Link>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>100 FREE orders (first-time bonus)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>300 orders per month</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>50 menu items</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Custom-branded digital menu with QR code generation</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Admin dashboard for real-time order management</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p> Basic customer support (Email & Chat)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p> Simple analytics for tracking top-selling items</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Daily sales summary reports</p>
                            </div>
                        </div>
                    </div>

                    <div className="plans">
                        <div className="plan">
                            <h4>Gold Plan (Growth)</h4>
                            <h3>{prices.gold}</h3>
                            <p className='pp'>For mid-sized restaurants and bars looking to streamline operations.</p>
                            <Link to='/signin'><button>Buy Now</button></Link>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>100 FREE orders (first-time bonus)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>500 orders per month</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>100 menu items</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Custom-branded digital menu with QR code generation</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Admin dashboard for real-time order management</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Priority customer support (Email, Chat & Call)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Sales analytics & order trend tracking</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Promotion of brand on the landing page and socials.</p>
                            </div>
                        </div>
                    </div>

                    <div className="plans">
                        <div className="plan">
                            <h4>Diamond Plan (Enterprise)</h4>
                            <h3>{prices.diamond}</h3>
                            <p className='pp'>For large restaurants, hotels,and  high-traffic businesses with digital ordering.</p>
                            <Link to='/signin'><button style={{background:'#FF7700', color:'#fff'}}>Buy Now</button></Link>


                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Unlimited orders per month</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Unlimited menu items</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Custom-branded digital menu with QR code generation</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Advanced admin dashboard with order analytics & customer insights</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Premium customer support (Dedicated account manager)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Multi-device access for restaurant staff</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Integration with POS & payment systems (Only on request)</p>
                            </div>

                            <div className="check-list">
                                <FaRegCheckSquare className='check'/>
                                <p>Promotion of brand on the landing page and socials.</p>
                            </div>
                        </div>
                    </div>


                </div>

                
            </div>
        </div>

        <div className="comparison">
            <div className="compare">
                <h2>Compare Plans & Features</h2>

                <div className="table-cont">
                    {/* <h2 className="table-title">Orders</h2> */}
                    <div className="overflow">
                        <table className="styl-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Silver Plan</th>
                                <th>Gold Plan</th>
                                <th>Diamond Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='hh'>
                                <td>Bonus</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>

                            <tr>
                                <td>Free orders</td>
                                <td>50 orders</td>
                                <td>100 orders</td>
                                <td>Unlimited</td>
                                
                            </tr>

                            <tr>
                                <td>Orders per month</td>
                                <td>300</td>
                                <td>500</td>
                                <td>Unlimited</td>
                            </tr>

                            <tr className='hh'>
                                <td>Menu Items</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>

                            <tr>
                                <td>Items per menu</td>
                                <td>50</td>
                                <td>100</td>
                                <td>Unlimited</td> 
                            </tr>

                            <tr>
                                <td>Menu + QR Code</td>
                                <td><LuCircleCheckBig /></td>
                                <td><LuCircleCheckBig /></td>
                                <td><LuCircleCheckBig /></td>
                                
                            </tr>

                            <tr className='hh'>
                                <td>Dashboard</td>
                                <td>Basic</td>
                                <td>Premier</td>
                                <td>Premium</td>
                                
                            </tr>

                            <tr>
                                <td>Support System</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>

                            <tr>
                                <td>Customer Support</td>
                                <td>Basic</td>
                                <td>Premier</td>
                                <td>Premium</td>
                                
                            </tr>

                            <tr>
                                <td>Order Tracking</td>
                                <td>Basic</td>
                                <td>Premier</td>
                                <td>Premium</td>

                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                            
                        </tbody>
                        </table>
                    </div>

                </div>


                <div className="support-c">
                <h2>We Support a Variety of Payment Methods</h2>

                    <div className="support">
                        <img src={img} alt="" />
                        <img src={img1} alt="" />
                        <img src={img2} alt="" />
                        <img src={img3} alt="" />
                        <img src={img4} alt="" />
                    </div>
                </div>
                

                <Faq/>

            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Pricing
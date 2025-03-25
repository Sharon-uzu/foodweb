import React from 'react';  
import { useNavigate } from 'react-router-dom'; // Updated import for v6 and above  
import img from '../Assets/restaurant-removebg-preview.png';  

const OrderSuccess = () => {  
  const navigate = useNavigate(); // Use useNavigate instead of useHistory  

  const handleOrderAgain = () => {  
    // Navigate back two steps in history  
    navigate(-2);  
  };  

  const handleExit = () => {  
    window.close(); 
    // Navigates to an external link, e.g., homepage  
    window.location.href = 'https://www.google.com'; // Change to your desired URL  
  };  

  return (  
    <div className='order-success'>  
      <div className='order-c'>  
        <img className='animated-image' src={img} alt="Food item" />  
        <h2>Order Successful!</h2>  
        <p>We’re pleased to inform you that your order was successful. Your food will be delivered shortly. Thank you for your order.</p>  
        <div className="order-btns">  
          <button onClick={handleOrderAgain}>Order Again</button>  
          <button className='btn2' onClick={handleExit}>Exit</button>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default OrderSuccess;  
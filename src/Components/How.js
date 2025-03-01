import React from 'react'
import img1 from '../Assets/material-symbols-light_qr-code.png'
import img2 from '../Assets/fluent_cart-24-regular.png'
import img3 from '../Assets/lets-icons_order-light.png'
const How = () => {
  return (
    <div className='category foods how'>
        <h2>How It Works</h2>
        <div className="foods-c">
          <div className="food">
            <div className="food-c">
              <img src={img1}  />
              <h3>Scan QR Code</h3>
              <p>Start your journing by scanning the QR code to get started with the website</p>
             
            </div>
          </div>

          <div className="food">
            <div className="food-c">
              <img src={img2}  />
              <h3>Add item to cart</h3>
              <p>Navigate through our various market choices and ‘’Add to Cart’’ your prefered choice.</p>
             
            </div>
          </div>

          <div className="food">
            <div className="food-c">
              <img src={img3}  />
              <h3>Place Order</h3>
              <p>Place your order to delivery by clicking on the “Order Now” button.</p>
             
            </div>
          </div>
      </div>
    </div>
        
  )
}

export default How
import React from 'react'
import img1 from '../Assets/material-symbols-light_qr-code.png'
import img2 from '../Assets/fluent_cart-24-regular.png'
import img3 from '../Assets/lets-icons_order-light.png'
import { BsQrCodeScan } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineReceipt } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";

const How = () => {
  return (
    <div className='category foods how' id='how'>
        <h2>How It Works</h2>
        <div className="foods-c">
          <div className="food">
            <div className="food-c">
              {/* <img src={img1}  /> */}
              <div className="h-icon">
                <BsQrCodeScan className="icc"/>
              </div>
              <h3>Scan QR Code</h3>
              <p>Simply scan the QR code on your table to access the digital menu instantly.</p>
             
            </div>
          </div>

          <div className="food">
            <div className="food-c">
              <div className="h-icon">
                <FiShoppingCart className="icc"/>
              </div>
              <h3>Add item to cart</h3>
              <p>Browse the menu, customize your meal, and add your favorite dishes to the cart.</p>
             
            </div>
          </div>

          <div className="food">
            <div className="food-c">
              <div className="h-icon">
                <MdOutlineReceipt className="icc"/>
              </div>
              <h3>Place Order</h3>
              <p>Confirm your selection, choose a payment option, and send your order to the kitchen.</p>
             
            </div>
          </div>

          <div className="food">
            <div className="food-c">
              <div className="h-icon">
                <IoFastFoodOutline className="icc"/>
              </div>
              <h3>Enjoy Your Meal</h3>
              <p>Sit back, relax, and let the restaurant serve your freshly prepared meal in no time!</p>
             
            </div>
          </div>

      </div>
    </div>
        
  )
}

export default How
import React from 'react';  

const Modal = ({ isOpen, onClose, message }) => {  
    if (!isOpen) return null;  

    return (  
        <div className="modal-overlay">  
            <div className="modal-content">  
                <h2>{message.includes("Error") ? "Error" : "Success"}</h2>  
                <p>{message}</p>  
                <button className='cart-close-button' onClick={onClose}>Close</button>  
            </div>  
        </div>  
    );  
};  

export default Modal;  
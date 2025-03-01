import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (food) => {
    setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart.find((item) => item.id === food.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCart.push({ ...food, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
    });
};

  

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, addToCart, removeFromCart, cartCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Make sure to export useCart correctly
export const useCart = () => useContext(CartContext);

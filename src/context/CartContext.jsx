import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setCartTotal(total);
    }, [cartItems]);

const addToCart = (item) => {
    const itemToAdd = {
        ...item,
        price: item.price,
        quantity: item.quantity, 
    };

    // Check if item is already in cart
    setCartItems((prevItems) => {
        // Find the index of the item in the cart   
        const existingIndex = prevItems.findIndex(
            (i) => i.id === item.id && i.condition === item.condition
        );
        // If the item is already in the cart, update the quantity
        if (existingIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingIndex].quantity += item.quantity;
            updatedItems[existingIndex].price =
                updatedItems[existingIndex].quantity * item.price;
            return updatedItems;
        } else {
            // If the item is not in the cart, add it
            return [...prevItems, itemToAdd];
        }
    });
};

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Not used but could use in the future. 
    // Clears the cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

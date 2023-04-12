import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [productCount, setProductCount] = useState({ qty: 0, productos: [] });

    return (
        <CartContext.Provider value={
            {
                productCount,
                setProductCount
            }
        }>
            {children}
        </CartContext.Provider>
    )
}
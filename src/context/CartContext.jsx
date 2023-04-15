import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [productCount, setProductCount] = useState({ qty: 0, productos: [], stock: 0 });

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
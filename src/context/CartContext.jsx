import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
    
    const [productCount, setProductCount] = useState();
    
    return(
        <CartContext.Provider value={{productCount, setProductCount}}>
            {children}
        </CartContext.Provider>
    )
}
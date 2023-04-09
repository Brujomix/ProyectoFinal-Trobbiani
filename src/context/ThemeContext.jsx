import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext("");

export const ThemeProvider = ({children}) => {

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("Theme") === "true" || false );

    useEffect(()=>{
        localStorage.setItem("Theme", isDarkMode)
    },[isDarkMode])

    return(
        <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

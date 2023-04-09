import React, {useState, useEffect, useContext} from 'react'
import { Loader } from '../pages/Loader';
import { ThemeContext } from '../context/ThemeContext';

export const MainLayout = ({children}) => {

  const [loading, setLoading] = useState("true");

  const {isDarkMode} = useContext(ThemeContext);
  
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  },[]);

  return loading? <Loader/> : (
    <div className={isDarkMode ? "contMainLight" : "contMainDark"}>
      {children}
    </div>
  )
}

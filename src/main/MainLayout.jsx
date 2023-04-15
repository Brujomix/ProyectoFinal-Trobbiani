import React, {useState, useEffect, useContext} from 'react'
import { Loader } from '../pages/Loader';
import { ThemeContext } from '../context/ThemeContext';

export const MainLayout = ({children}) => {

  const [loading, setLoading] = useState("true");

  const {isDarkMode} = useContext(ThemeContext);
  
  useEffect( _ =>{
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  },[]);

  return loading? <Loader/> : (
    <div className={isDarkMode ? "contMainLight" : "contMainDark"}>
      {children}
    </div>
  )
}

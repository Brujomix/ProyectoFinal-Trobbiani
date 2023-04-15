import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Button, InputGroup } from 'react-bootstrap'
import { ThemeContext } from '../context/ThemeContext'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { CartContext } from '../context/CartContext'

const Count = () => {

  const { productCount } = useContext(CartContext);

  return (
    <InputGroup aria-readonly>{productCount.qty}</InputGroup>
  )
}

export const Header = _ => {

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [img, setImg] = useState("imagen Logo")

  /* Descarga la imagen del Logo para el Header */
  useEffect(_ => {
    const dbS = getStorage();
    getDownloadURL(ref(dbS, "extrasImgs/DeWEB-logo-White.png"))
      .then((res) => setImg(res))
  }, []);

  /* Accion del boton que cambia de Theme */
  function HandleEventTheme() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className='contHeader'>
      <div className='Header'>
        <Link to={"/"}>
          <img
            src={img}
            alt="Logo de la Empresa" />
        </Link>
        <div className='contThemeCart'>
          <div className='CartCount'>
            <div>
              <Count />
            </div>
            <div>
              <Link to={"/cart"}>
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>
            </div>
          </div>
          <Button onClick={HandleEventTheme}>Theme</Button>
        </div>
      </div>
    </div>
  )
}

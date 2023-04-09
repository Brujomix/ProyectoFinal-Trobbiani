import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Button, InputGroup } from 'react-bootstrap'
import { ThemeContext } from '../context/ThemeContext'

const Count = () =>{
  return(
    <>
      <InputGroup aria-readonly>0</InputGroup>
    </>
  )
}

export const Header = () => {

  const {isDarkMode, setIsDarkMode} = useContext(ThemeContext);

  function HandleEventTheme (){
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className='contHeader'>
      <div className='Header'>
        <Link to={"/"}>
          <h1>Home</h1>
        </Link>
        <div className='contThemeCart'>
          <div className='CartCount'>
            <div>
              <Count/>
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

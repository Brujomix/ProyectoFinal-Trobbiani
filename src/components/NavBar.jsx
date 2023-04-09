import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='contNavBar'>
      <div className='NavBar'>
        <Link to={"/productos"}>Todos Los Productos</Link>
        <Link to={"/categoria/indumentaria"}>Categoria Indumentaria</Link>
        <Link to={"/categoria/joyas"}>Categoria Joyas</Link>
        <Link to={"/categoria/computacion"}>Categoria Computacion</Link>
      </div>
      <hr />
    </div>
  )
}

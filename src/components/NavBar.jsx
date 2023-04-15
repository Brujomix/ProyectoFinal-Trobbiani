import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export const NavBar = _ => {

  const navigate = useNavigate();
  const handleEventProductos = _ => navigate("/productos");
  const handleEventCatIndumentaria = _ => navigate("/categoria/indumentaria");
  const handleEventCatJoyas = _ => navigate("/categoria/joyas");
  const handleEventCatComputacion = _ => navigate("/categoria/computacion");


  return (
    <div className='contNavBar'>
      <div className='NavBar'>
        <Button onClick={handleEventProductos}>Productos</Button>
        <Button onClick={handleEventCatIndumentaria}>Indumentaria</Button>
        <Button onClick={handleEventCatJoyas}>Joyas</Button>
        <Button onClick={handleEventCatComputacion}>Computacion</Button>
      </div>
    </div>
  )
}

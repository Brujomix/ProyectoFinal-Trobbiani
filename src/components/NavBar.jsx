import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export const NavBar = _ => {

  const navigate = useNavigate();
  const handleEventProductos = _ => navigate("/productos");
  const handleEventCatIndumentaria = _ => navigate("/categoria/indumentaria");
  const handleEventCatJoyas = _ => navigate("/productos");
  const handleEventCatComputacion = _ => navigate("/productos");
  

  return (
    <div className='contNavBar'>
      <div className='NavBar'>
        <Button onClick={handleEventProductos}>Productos</Button>
        <Button onClick={handleEventCatIndumentaria}>Indumentaria</Button>
        <Button onClick={handleEventCatJoyas}>Joyas</Button>
        <Button onClick={handleEventCatComputacion}>Computacion</Button>
        <hr style={{width:"100vw", border: "3px solid #black"}}/>
      </div>
    </div>
  )
}

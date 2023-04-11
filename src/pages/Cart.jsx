import React, { useContext } from 'react'
import {CardProducto, Checkout} from "../components"
import { CartContext } from '../context/CartContext'

export const Cart = () => {
  
  const {productoCount} = useContext(CartContext);
  
  return (
    <div className='contCart'>
        <div className='Cart'>
            <span>Mostrar el Array de productosCart</span>
        </div>
        <div>
          <Checkout/>
        </div>
    </div>
  )
}

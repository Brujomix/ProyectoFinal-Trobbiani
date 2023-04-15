import React, { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap'
import { CartContext } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const CartButton = _ => {
  
  const [stock, setStock] = useState(0)
  const [count, setCount] = useState(1);
  const { productCount, setProductCount } = useContext(CartContext);
  const { productoId } = useParams();
 
  /* Effect para que se desabiliten los botones dependiendo del stock producto */
  useEffect(()=>{
    const dbF = getFirestore();
        const docRef = doc(dbF, "productos", productoId);
        getDoc(docRef)
        .then((res)=>{
            if(!res.exists()){
                console.log("no encontrado");
            }
         setStock(res.data().stock);
        })
        .catch((err)=>{
            console.log(err);
        })
  },[count])
  
  /* Funciones de Incremento y Decremento del Contador Productos */
  const increment = _ => setCount(count + 1);  
  const decrement = _ => setCount(count - 1);

  /* Agregar productos al Carrito y sumar el QTY general */
  function handleEventAgregar() {
    const existProducto = productCount.productos.find((e) => e.productoId === productoId);
    if (existProducto) {
      existProducto.qty += count;
    } else {
      const newProduct = {
        productoId,
        qty: count
      };
      setProductCount((prevState)=>({
        qty: prevState.qty + count,
        productos: [...prevState.productos, newProduct]
      }
      ))
    }
  }
  
  return (
    <div className='contCartButton'>
      <div className='CartButton'>
        <ButtonGroup>
          <Button disabled={count === stock} onClick={increment}>+</Button>
          <InputGroup className='countCart' aria-readonly >{count}</InputGroup>
          <Button disabled={count == 1} onClick={decrement}>-</Button>
        </ButtonGroup>
        <Button onClick={handleEventAgregar}>Agregar al Carrito</Button>

      </div>
    </div>
  )
}

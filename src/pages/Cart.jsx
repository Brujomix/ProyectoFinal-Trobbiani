import React, { useContext, useEffect, useState } from 'react'
import { CartDetalles, Checkout } from "../components"
import { CartContext } from '../context/CartContext'

import { collection, getDoc, doc, getFirestore } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
import { Loader } from './Loader'

const prodctsIdBD = async (ids) => {

  const dbF = getFirestore();
  const pRef = ids.map((id)=> doc(collection(dbF,"productos"), id));
  const pSnapshots = await Promise.all(
  pRef.map((e)=> getDoc(e)));

  const matchProd = pSnapshots.map((e)=>{
    if(e.exists()){
      return {id: e.id, ...e.data()};
    }else{ return null;}
  })

  return matchProd.filter((e) => e !== null);
}

export const Cart = () => {

  const {productCount} = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true)
  let location = useLocation();
  //console.log(location)

  useEffect(()=>{
    const ids = productCount.productos.map((e)=>e.productoId);
    prodctsIdBD(ids)
    .then((res)=> setProductData(res))
    .catch((err)=> console.log(err))
    .then(()=> setLoading(false)
  );
  },[productCount.productos])
  
  const qtyByProductoId = ((productoId)=>{
    const producto = productCount.productos.find(
      (e) => e.productoId === productoId);
      return producto ? producto.qty:0; //No tengo la cantidad !
    });
    
    const total = productData
    .map((e)=> e.precio * qtyByProductoId(e.id))
    .reduce((acc, currentValue)=> acc + currentValue, 0);
  
    console.log(productCount)
    console.log(productData)

    location.state = total
 
  return loading ? <Loader/> : (
    <div className='contCart'>
        <div className='Cart'>
          {productData.map((producto) => (
            <CartDetalles 
              key={producto.id} 
              cartProducto={producto}
              qty={productCount.productos.find((e)=>e.productoId === producto.id)} 
            />
          ))
        }
        </div>
        <div className='CheckoutButtonTotal'>
          <Checkout/>
          <b>Total a Abonar $ {total}</b>        
        </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { CartDetalles } from "../components"
import { CartContext } from '../context/CartContext'
import {Loader} from "../pages"
import { collection, getDoc, doc, getFirestore } from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const prodctsIdBD = async (ids) => {

  const dbF = getFirestore();
  const pRef = ids.map((id)=> doc(collection(dbF,"productos"), id));
  const pSnapshots = await Promise.all(
  pRef.map((e)=> getDoc(e)));
  console.log(pSnapshots)

  const matchProd = pSnapshots.map((e)=>{
    if(e.exists()){
      return {id: e.id, ...e.data()};
    }else{
      return null;
    }
  })
  //console.log(matchProd)
  return matchProd.filter((e) => e !== null);

}

export const Cart = () => {
  
  

  const {productCount} = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState("true")
  const navigate = useNavigate();

  useEffect(()=>{
    const ids = productCount.productos.map((e)=>e.productoId);
    prodctsIdBD(ids)
    .then((res)=> 
    {
      setProductData(res)  //Puede estar aca el problema
    })
    .catch((err)=> console.log(err))
    .then(()=> {
      setLoading(false)
      console.log("hola")
      console.log(productCount)
    });
  },[productCount.productos])
  
  
  const qtyByProductoId = ((productoId)=>{
    const producto = productCount.productos.find(
      (e) => e.productoId === productoId);
      return producto ? producto.qty:0; //No tengo la cantidad !
    });
    
    const total = productData
    .map((e)=> e.precio * qtyByProductoId(prodctsIdBD))
    .reduce((acc, currentValue)=> acc + currentValue, 0);
 
    console.log(total)

  function handleEventCheck() {
     // navigate = useNavigate("/checkout", {state: total})
      console.log("Click Checkout")
  }
 
  return (
    <div className='contCart'>
        <div className='Cart'>
          <h1>Aqui el map de prodcutos Cart</h1>
          {/* {
            productData.map((cartProducto)=>{
              <CartDetalles cartProducto={{cartProducto}}/>
            })
          } */}
        </div>
        <div>
          <Button onClick={handleEventCheck}>Checkout</Button>
        </div>
    </div>
  )
}

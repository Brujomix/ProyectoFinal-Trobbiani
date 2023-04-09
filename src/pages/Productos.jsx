import React, { useEffect, useState } from 'react'
import { CardProducto } from '../components/CardProducto'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {Loader} from "../pages"

export const Productos = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbF = getFirestore();
    const getProductos = collection(dbF, "productos");
    getDocs(getProductos)
    .then((res)=>{
      if(res.length === 0){
        console.log("No se encontraron productos")
      }
      setData(res.docs.map((doc)=>({id: doc.id, ...doc.data()})));
    })
    .catch((err)=>{
      console.log(err);
    })
    .then(()=>{
      setLoading(false);
    })
  }, []);

  return loading? <Loader/> : (
    <div className='contProductos'>
      <div className='Productos'>
        {
          data.map((producto) =>
            <CardProducto key={producto.id} producto={producto} />
          )
        }
      </div>
    </div>
  )
}

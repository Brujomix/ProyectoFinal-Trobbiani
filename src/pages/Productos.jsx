import React, { useEffect, useState } from 'react'
import { CardProducto } from '../components/CardProducto'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {Loader} from "../pages"
import { CrudProducto } from '../components'

export const Productos = _ => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(_ => {
    const dbF = getFirestore();
    const getProductos = collection(dbF, "productos");
    getDocs(getProductos)
    .then((res)=>{
      if(res.length === 0){
        console.log("No se encontraron productos")
      }
      setData(res.docs.map((e)=>({id: e.id, ...e.data()})));
    })
    .catch((err)=> console.log(err))
    .then(_=> setLoading(false))
  }, []);

  return loading? <Loader/> : (
    <div className='contProductos'>
        <CrudProducto/>
      <div className='Productos'>
        {
          data.map((e) =>
            <CardProducto key={e.id} producto={e} imgPath={e.imagen} />
          )
        }
      </div>
    </div>
  )
}

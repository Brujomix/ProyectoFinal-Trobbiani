import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { CardProducto } from '../components/CardProducto';
import {getFirestore, collection, getDocs, query, where} from "firebase/firestore"
import {Loader} from "../pages"

export const Categorias = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const {categoriaId} = useParams();

  useEffect(()=>{

    const dbF = getFirestore();
    const productosFiltCat = query(
      collection(dbF, "productos"),
      where("categoria", "==", `${categoriaId}`)
    );
    getDocs(productosFiltCat)
    .then((res)=>{
      if(res.length === 0){
        console.log("No se encontraron Productos con esa categoria");
      }
      setData(res.docs.map((doc)=>({id: doc.id, ...doc.data()})));
    })
    .catch((err)=>{
      console.log(err)
    })
    .then(()=>{
      setLoading(false);
    })
    
  },[categoriaId]);

  return loading? <Loader/> : (
    <div className='contCategorias'>
        <div className='Categorias'>
          {
          data.map((producto) =>
            <CardProducto key={producto.id} producto={producto} imgPath={producto.imagen} />
          )
        }
        </div>
    </div>
  )
}

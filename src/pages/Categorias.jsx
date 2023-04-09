import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { CardProducto } from '../components/CardProducto';

export const Categorias = () => {

  const [data, setData] = useState([]);
  const {id} = useParams();


  return (
    <div className='contCategorias'>
        <div className='Categorias'>
          {
            data.map((producto)=>{
              <CardProducto key={producto.id} producto={producto}/>
            })
          }
        </div>
    </div>
  )
}

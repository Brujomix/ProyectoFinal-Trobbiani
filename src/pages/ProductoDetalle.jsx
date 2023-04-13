import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {CardProducto, CartButton} from "../components"
import {getFirestore, doc, getDoc} from "firebase/firestore"
import { Loader } from './Loader'


export const ProductoDetalle = () => {

    const [loading,setLoading] = useState(true);
    const { productoId } = useParams();
    const [data, setData] = useState({});

    useEffect(()=>{
        const dbF = getFirestore();
        const docRef = doc(dbF, "productos", productoId);
        getDoc(docRef)
        .then((res)=>{
            if(!res.exists()){
                console.log("no encontrado");
            }
         setData({id: res.id, ...res.data()});
        })
        .catch((err)=>{
            console.log(err);
        })
        .then(()=>{
            setLoading(false);
        })
    },[]);

    return loading? <Loader/> : (
        <div className='contProductoDetalle'>
            <div className='ProductoDetalle'>
                <CardProducto key={data.id} producto={data} imgPath={data.imagen}/> 
                <CartButton/>                        
            </div>
        </div>
    )
}

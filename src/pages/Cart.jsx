import React, { useContext, useEffect, useState } from 'react'
import { CartDetalles, Checkout } from "../components"
import { CartContext } from '../context/CartContext'

import { collection, getDoc, doc, getFirestore } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Loader } from './Loader'

/* Obtiene todos los Ids de la base de datos que correspondan a productosCount */
const prodctsIdBD = async (ids) => {
  const dbF = getFirestore();
  const pRef = ids.map((id) => doc(collection(dbF, "productos"), id));
  const pSnapshots = await Promise.all(
    pRef.map((e) => getDoc(e)));
  const matchProd = pSnapshots.map((e) => {
    if (e.exists()) {
      return { id: e.id, ...e.data() };
    } else { return null; }
  })
  return matchProd.filter((e) => e !== null);
}

export const Cart = _ => {

  const { productCount } = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate();
  let location = useLocation();

  /* EfFect Los ids Obtenidos los compara con ProductosCount */
  useEffect( _ => {
    const ids = productCount.productos.map((e) => e.productoId);
    prodctsIdBD(ids)
      .then((res) => setProductData(res))
      .catch((err) => console.log(err))
      .then( _ => {
        if (productCount.productos.length === 0) {
          Swal.fire(
            {
              icon:"info",
              title:"Oops Ningun Item Encontrado en Carrito"
            }
          )
          navigate("/productos")
        } else {setLoading(false)}
      }
      );
  }, [productCount.productos])

  /* Obtiene la cantidad de cada producto que asignamos desde CardDetalle -- CartButton */
  const qtyByProductoId = ((productoId) => {
    const producto = productCount.productos.find(
      (e) => e.productoId === productoId);
    return producto ? producto.qty : 0;
  });

  /* Calcula el total de la cantidad de productos por el precio de cada uno */
  const total = productData
    .map((e) => e.precio * qtyByProductoId(e.id))
    .reduce((acc, currentValue) => acc + currentValue, 0);

  console.log(productCount)
  console.log(productData)

  /* Extrae en el location el total para usarlo posteriormente en Checkout */
  location.state = total

  return loading ? <Loader/> : (
    <div className='contCart'>
      <div className='Cart'>
        {productData.map((producto) => (
          <CartDetalles
            key={producto.id}
            cartProducto={producto}
            qty={productCount.productos.find((e) => e.productoId === producto.id)}
            imgPath={producto.imagen}
          />
        ))
        }
      </div>
      <div className='CheckoutButtonTotal'>
        <Checkout />
        <b>Total a Abonar $ {total}</b>
      </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { CartDetalles, Checkout } from "../components"
import { CartContext } from '../context/CartContext'

import { collection, getDoc, doc, getFirestore } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Loader } from './Loader'

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

export const Cart = () => {

  const { productCount } = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  let location = useLocation();

  //console.log(location)

  useEffect(() => {
    const ids = productCount.productos.map((e) => e.productoId);
    prodctsIdBD(ids)
      .then((res) => setProductData(res))
      .catch((err) => console.log(err))
      .then(() => {
        if (productCount.productos.length === 0) {
          Swal.fire(
            {
              icon:"info",
              title:"Oops Ningun Item Encontrado en Carrito"
            }
          )
          navigate("/productos")
        } else {
          setLoading(false)
        }
      }
      );
  }, [productCount.productos])

  const qtyByProductoId = ((productoId) => {
    const producto = productCount.productos.find(
      (e) => e.productoId === productoId);
    return producto ? producto.qty : 0; //No tengo la cantidad !
  });

  const total = productData
    .map((e) => e.precio * qtyByProductoId(e.id))
    .reduce((acc, currentValue) => acc + currentValue, 0);

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

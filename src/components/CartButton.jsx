import React, { useContext, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { CartContext } from '../context/CartContext';
import { useParams } from 'react-router-dom';

export const CartButton = () => {

    const [count, setCount] = useState(1);
    const { productCount, setProductCount } = useContext(CartContext);
    const { productoId } = useParams();

    function handleEventSuma() {
        setCount(count + 1)
    }

    function handleEventResta() {
        setCount(count - 1)
    }

    function handleEventAgregar() {

        console.log("agregando al carrito")
    
        /* const existingProducto = productCount.productos.find((e) => e.productoId === productoId);
        console.log(existingProducto)
        if (existingProducto) {
            existingProducto.qty += count;
        } else {
            const newProduct = {
                productoId,
                qty: count
            };
            setProductCount((prevState) => ({
                qty: prevState.qty + count,
                productos: [...prevState.productos, newProduct]
            }))
        } */
    }

    return (
        <div className='contCartButton'>
            <div className='CartButton'>

                <ButtonGroup>
                    <Button onClick={handleEventSuma}>+</Button>
                    <input className='text-center' readOnly value={count} />
                    <Button onClick={handleEventResta}>-</Button>
                </ButtonGroup>
                <Button onClick={handleEventAgregar}>Agregar al Carrito</Button>

            </div>
        </div>
    )
}

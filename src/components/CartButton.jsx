import React, { useState } from 'react'
import { Button, ButtonGroup} from 'react-bootstrap'

export const CartButton = () => {

    const[count, setCount] = useState(0);

    function handleEventSuma(){
        setCount(count + 1)
    }

    function handleEventResta(){
        setCount(count - 1)
    }

    function handleEventAgregar() {
        console.log("Agregado al carrito");
    }

    return (
        <div className='contCartButton'>
            <div className='CartButton'>
                
                <ButtonGroup>
                    <Button onClick={handleEventSuma}>+</Button>
                    <input className='text-center' readOnly value={count}/>
                    <Button onClick={handleEventResta}>-</Button>
                </ButtonGroup>
                <Button onClick={handleEventAgregar}>Agregar al Carrito</Button>
                
            </div>
        </div>
    )
}

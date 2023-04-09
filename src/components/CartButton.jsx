import React from 'react'
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap'

export const CartButton = () => {
    return (
        <div className='contCartButton'>
            <div className='CartButton'>
                <ButtonGroup>
                    <Button>+</Button>
                    <InputGroup aria-readonly>0</InputGroup>
                    <Button>-</Button>
                </ButtonGroup>
                <Button>Agregar al Carrito</Button>
            </div>
        </div>
    )
}

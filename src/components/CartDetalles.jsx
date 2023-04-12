import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'


export const CartDetalles = ({ cartProducto, qty}) => {
    return (
        <div className='contCartDetalles'>
            <div className='CartDetalles'>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                        <Card.Title>{cartProducto.nombre}</Card.Title>
                        <Card.Text>
                            {cartProducto.descripcion}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Stock: {cartProducto.stock}</ListGroup.Item>
                        <ListGroup.Item>$ {cartProducto.precio}</ListGroup.Item>
                        <ListGroup.Item>Cantidad: {qty.qty}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </div>
    )
}

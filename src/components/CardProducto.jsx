import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const CardProducto = ({producto}) => {

    return (
        <div className='contCardProducto'>
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                        <Card.Title>{producto.nombre}</Card.Title>
                        <Card.Text>
                            {producto.descripcion}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Categoria: {producto.categoria}</ListGroup.Item>
                        <ListGroup.Item>$ {producto.precio}</ListGroup.Item>
                        <ListGroup.Item>Stock: {producto.stock}</ListGroup.Item>
                        <ListGroup.Item>id: {producto.id}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Link to={`/producto/${producto.id}`}>Ver Detalles</Link>                      
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

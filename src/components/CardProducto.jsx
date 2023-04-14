import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const CardProducto = ({ producto, imgPath }) => {

    const [img, setImg] = useState("")
    useEffect(() => {
        const dbS = getStorage();
        getDownloadURL(ref(dbS, imgPath))
            .then((res) => {
                setImg(res);
            })
    }, [imgPath]);

    return (
        <div className='contCardProducto'>
            <div className='CardProducto'>
                <Card className='Card'>
                    <Card.Body>
                        <Card.Img className="imgCardProducto" variant="top" src={img} />
                        <Card.Title>{producto.nombre}</Card.Title>
                        <Card.Text>{producto.descripcion}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Categoria: {producto.categoria}</ListGroup.Item>
                        <ListGroup.Item>$ {producto.precio}</ListGroup.Item>
                        <ListGroup.Item>Stock: {producto.stock}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Link to={`/producto/${producto.id}`}>Ver Detalles</Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const CartDetalles = ({ cartProducto, qty, imgPath }) => {

    /* Props descarga la imagen por cada CartDetalle (productos en el carrito) */
    const [img, setImg] = useState("")
    useEffect( _ => {
        const dbS = getStorage();
        getDownloadURL(ref(dbS, imgPath))
            .then((res) => {
                setImg(res);
            })
    }, [imgPath]);

    return (
        <div className='contCartDetalles'>
            <div className='CartDetalles'>
                <Card className='Cart'>
                    <Card.Body>
                        <Card.Img className='imgCartDetalle' variant="top" src={img} />
                        <Card.Title>{cartProducto.nombre}</Card.Title>
                        <Card.Text>{cartProducto.descripcion}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Stock: {cartProducto.stock}</ListGroup.Item>
                        <ListGroup.Item>$ {cartProducto.precio}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <ListGroup.Item>Cantidad: {qty.qty}</ListGroup.Item>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

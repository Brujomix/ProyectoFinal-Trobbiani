import React, { useState, useEffect } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export const CardProducto = ({ producto, imgPath }) => {

    /* Navegacion a Producto Detalle con Botones Carrito */
    const navigate = useNavigate();
    function handleEventDetalles() {
        navigate(`/producto/${producto.id}`)
    }

    /* Efect download img de cada CardProducto */
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
                    <Card.Footer className='CardFooter'>
                        <Button onClick={handleEventDetalles}>Ver Detalles</Button>
                    </Card.Footer>                
                </Card>
            </div>
        </div>
    )
}

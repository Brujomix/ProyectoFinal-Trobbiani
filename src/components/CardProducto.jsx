import React, {useState, useEffect} from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getStorage, ref ,getDownloadURL } from 'firebase/storage'

export const CardProducto = ({ producto }) => {

    const [img, setImg] = useState("imagen Producto")

    useEffect(() => {
        const dbS = getStorage();
        getDownloadURL(ref(dbS, `extrasImgs/imgDefaultProducto.png`))
            .then((res) => {
                setImg(res);
            })
    }, []);

    return (
        <div className='contCardProducto'>
            <div>
                <Card style={{ width: '16rem' }}>
                    <Card.Img className='w-50 p-2' variant="top" src={img}/>
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
                    </ListGroup>
                    <Card.Body>
                        <Link to={`/producto/${producto.id}`}>Ver Detalles</Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

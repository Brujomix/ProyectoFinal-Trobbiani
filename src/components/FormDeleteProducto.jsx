import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export const FormDeleteProducto = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  function handleDeleteProducto() { 
    console.log("Producto Eliminado")
  }
  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
          Eliminar Producto
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Hacer Formulario
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleDeleteProducto}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

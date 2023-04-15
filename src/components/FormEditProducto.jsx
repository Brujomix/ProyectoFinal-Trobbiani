import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export const FormEditProducto = () => {
  const [show, setShow] = useState(false);

  const handleClose = _ => setShow(false);
  const handleShow = _ => setShow(true);
   
    function handleEditProducto() {
        console.log("Producto Editado")
      }

  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
          Editar Producto
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
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
            <Button variant="primary" onClick={handleEditProducto}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

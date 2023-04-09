import React, { useState} from 'react'
import { Button } from 'react-bootstrap';
import { Modal, Form } from 'react-bootstrap';
import {getFirestore, collection, addDoc} from "firebase/firestore"

export const FormAddProducto = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    const newProducto = {
      categoria : `${e.target.formBasicCategoria.value}`,
      descripcion: `${e.target.formBasicDescripcion.value}`,
      imagen: "url img",
      nombre: `${e.target.formBasicNombre.value}`,
      precio: parseInt(e.target.formBasicPrecio.value),
      stock : parseInt(e.target.formBasicStock.value)     
    }
    console.log(newProducto); 
    const deF = getFirestore();
    const getProductos = collection(deF, "productos") 
    addDoc(getProductos, newProducto)
    .then(({id})=>{
      console.log(id);    
    }).catch(()=>{
      console.log("no pudimos agregar tu producto")
    })
    .then(()=>{
      setShow(false)
    })
  }

  function handleEventUpload(){
    console.log("subindo imagen")
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agregar Producto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form onSubmit={handleEventSubmit}>
              <Form.Group className="mb-3" controlId="formBasicImagen">
                <Form.Label></Form.Label>
                <input type='file'
                 // onChange={(e) => setFile(e.target.files[0])}
                />
                //<Button onClick={handleEventUpload}>Unpload</Button>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Control required type="text" placeholder="Nombre" />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicDescripcion">
                <Form.Control as="textarea" required rows={3} placeholder="Descripcion" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select id="formBasicCategoria" required>
                  <option>indumentaria</option>
                  <option>joyas</option>
                  <option>computacion</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicStock">
                <Form.Control required type="Number" placeholder="Stock" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrecio">
                <Form.Control required type="Number" placeholder="Precio" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Form>
          </>
        </Modal.Body>
          <div className='p-2'>
            <b>Instrucciones:</b>
            <ul>
              <li>Todos los campos son requeridos</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>     
      </Modal>
    </>
  )
}



import React, { useContext, useState } from 'react'
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap'
import { CartContext } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import { Timestamp, addDoc, collection, getFirestore } from 'firebase/firestore';

export const Checkout = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const {productoCount} = useContext(CartContext);
  
  const location = useLocation();
  const total = location.state;

  function handleEventPagar(e) {
    e.preventDefault();
    console.log(e)
    /* const nombre = e.target.formNombre.value;
    const cartNumber = e.taget.formCartNumber.value;
    const fechaExpiracion = e.target.formFecha.value;
    const cvc = e.target.formCvc.value;
    console.log(nombre, cartNumber, fechaExpiracion, cvc)
  
  const newVenta = {
    nombre: nombre,
    cartNumber: cartNumber,
    fechaExpiracion: fechaExpiracion,
    cvc: cvc,
    total: total,
    products: productoCount,
    fechaCompra: Timestamp.fromDate(new Date())
  };
    
    const dbF = getFirestore()
    const ventasCollection = collection(dbF, "ventas");
    addDoc(ventasCollection, newVenta)
    .then((res)=> console.log(res)
    .catch((err)=> console.log(err))
    ) */
  };

  return (
    <div className='contCheckout'>
      <div className='checkout'>
        <Button variant="primary" onClick={handleShow}>
          Checkout
        </Button>
        <Modal show={show} onHide={handleClose}>
          <ModalTitle className='text-center'>Ticket Checkout</ModalTitle>
          <Form className='p-3' onSubmit={handleEventPagar}>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Nombre" controlId="formNombre"/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Cart Number xxxxxxxxxxx" controlId="formCartNumber" />
            </Form.Group>
            
            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Fecha de Vencimiento" controlId="formFecha" />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Enter CVC xxx" controlId="formCvc"  />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control readOnly type="number" placeholder="Total" value={total} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Pagar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>

          </Form>
        </Modal>
      </div>
    </div>
  )
}

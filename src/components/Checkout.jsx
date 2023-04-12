import React, { useContext, useState } from 'react'
import { Modal, Button, Form, ModalTitle, FormText } from 'react-bootstrap'
import { CartContext } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timestamp, addDoc, collection, getFirestore } from 'firebase/firestore';

export const Checkout = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { productCount } = useContext(CartContext);
  const navigate = useNavigate();

  const location = useLocation();
  const total = location.state;

  function handleEventPagar(e) {
    e.preventDefault();
    console.log(e)

    const newVenta = {
      nombre: `${e.target.formNombre.value}`,
      cartNumber: parseInt(e.target.formCartNumber.value),
      fechaExpiracion: `${e.target.formFecha.value}`,
      cvc: parseInt(e.target.formCvc.value),
      total: total,
      productos: productCount,
      status: "Aprobada",
      fechaCompra: Timestamp.fromDate(new Date())
    };
    console.log(newVenta)

    const dbF = getFirestore();
    const getVentas = collection(dbF, "ventas")
    addDoc(getVentas, newVenta)
      .then(({ id }) => {
        console.log(id);
      }).catch(() => {
        console.log("no pudimos agregar la venta a base de datos")
      })
      .then(() => {
        navigate("/");
      })
    
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

            <Form.Group className="mb-3" controlId="formNombre" >
              <Form.Control type="text" placeholder="Nombre Completo" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCartNumber">
              <Form.Control type="Number" pattern='[0-9]{16}' placeholder="Cart Number xxxx xxxx xxxx xxxx" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFecha">
              <Form.Control type="month" form placeholder="Fecha de Vencimiento" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCvc">
              <Form.Control type="Number" pattern='[0-9]{3}' placeholder="Enter CVC xxx" required />
            </Form.Group>

            <Form.Group className="mb-3" >
              <FormText>Total a Pagar $</FormText>
              <Form.Control readOnly type="Number" placeholder="Total" value={total} />
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
import React, { useState } from 'react'
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Checkout = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function handleEventPagar() {
    console.log("Pago Exitoso")
  }


  return (
    <div className='contCheckout'>
      <div className='checkout'>
        <Button variant="primary" onClick={handleShow}>
          Checkout
        </Button>
        <Modal show={show} onHide={handleClose}>
          <ModalTitle>Ticket Checkout</ModalTitle>
          <Form onSubmit={handleEventPagar}>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Nombre" />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Cart Number xxxxxxxxxxx" />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control type="text" placeholder="Enter CVC xxx" />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Control type="number" placeholder="Total" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Pagar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancelar
            </Button>

          </Form>
        </Modal>
      </div>
    </div>
  )
}

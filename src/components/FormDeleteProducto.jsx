import React, { useState } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { getFirestore, collection, getDoc, query, where, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const FormDeleteProducto = () => {
  const [show, setShow] = useState(false);

  const handleClose = _ => setShow(false);
  const handleShow = _ => setShow(true);

  const navigate = useNavigate();

  const [valorBusqueda, setValorBusqueda] = useState("");
  const [valorEncontrado, setValorEncontrado] = useState({});
  console.log(valorBusqueda)

  const buscarProductoByName = _ => {
    const dbF = getFirestore();
    const refP = query(
      collection(dbF, "productos"),
      where("categoria", "==", `${valorBusqueda}`)
    );
    getDoc(refP)
      .then((res) => {
        if (res.length === 0) {
          console.log("producto no encontrado")
        } else {
          console.log(res)
          setValorEncontrado({id: res.id, ...res.data()});
        }
      })
      .catch((err) => console.log(err))
      .then(_ => {
        console.log(valorEncontrado)
      })
  }

  const handleEventEliminar = _ => {
    const dbF = getFirestore();
    if (valorBusqueda) {
      deleteDoc(dbF, "productos", `${valorBusqueda}`)
        .then(({ id }) => console.log(id))
        .catch(_ => console.log("no pudimos eliminar el producto"))
        .then(_ => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Procesando'
          })
          navigate("/productos")
        })
    } else {
      Swal.fire(
        {
          icon: "warring",
          title: "No eliminado"
        }
      )
    }
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
          <Form onSubmit={handleEventEliminar}>

            <FormGroup>
              <input type='text' onChange={(e) => { setValorBusqueda(e.target.value) }} placeholder='Buscar Producto' />
              <Button onClick={buscarProductoByName}>Buscar</Button>
            </FormGroup>

            <Button variant="primary" type='submit'>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className='p-2'>
            <b>Instrucciones:</b>
            <ul>
              <li>Ten en cuenta que al momento de confirmar, no puede desacer los cambios</li>
              <li>Podras dar de alta el producto nuevamente mas tarde</li>
            </ul>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

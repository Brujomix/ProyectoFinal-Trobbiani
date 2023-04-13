import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Modal, Form } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { Loader } from '../pages/Loader';

export const FormAddProducto = () => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    const newProducto = {
      categoria: `${e.target.formBasicCategoria.value}`,
      descripcion: `${e.target.formBasicDescripcion.value}`,
      imagen: `${imgPath}`,
      nombre: `${e.target.formBasicNombre.value}`,
      precio: parseInt(e.target.formBasicPrecio.value),
      stock: parseInt(e.target.formBasicStock.value)
    }
    console.log(newProducto);

    const deF = getFirestore();
    const getProductos = collection(deF, "productos")
    addDoc(getProductos, newProducto)
      .then(({ id }) => {
        console.log(id);
      }).catch(() => {
        console.log("no pudimos agregar tu producto")
      })
      .then(() => {
        setShow(false);
        navigate("/productos");
      })
  }

  const [nameImg, setNameImg] = useState("imagen")
  const [imgPath, setImgPath] = useState("extrasImg/imgDefaultProducto.png")

  function handleEventUpload() {
    console.log(nameImg)
    const dbS = getStorage();
    const refImg = ref(dbS, `/productosImgs/${nameImg}`)
    uploadBytes(refImg, nameImg)
      .then((res) => {
        setImgPath(res.metadata.fullPath)
      })
      .catch((err) => {
        console.log(err);
      })
      
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
                <Form.Label className='uploadImagen'>Upload Imagen</Form.Label>
                <div>
                  <input required type='file'
                    onChange={(e) => {
                      setNameImg(e.target.files[0].name)
                    }}
                  />
                </div>

                <Button onClick={handleEventUpload}>Upload</Button>
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
            <li>Las imagenes deben tener un tamaño de no mas de 100kb</li>
            <li>El nombre de la imagen no debe contener espacios, simbolos ni numeros</li>
          </ul>
        </div>
      </Modal>
    </>
  )
}



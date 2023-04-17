import React, { useState } from 'react'
import { Button, FormControl } from 'react-bootstrap';
import { Modal, Form, FormText } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const FormAddProducto = _ => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = _ => setShow(false);
  const handleShow = _ => setShow(true);

  /* Submit Form add recolecta los datos del formulario, valida y envia el producto a Firebase */
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
      }).catch(_ => console.log("Error"))
      .then(_ => {
        setShow(false);
        Swal.fire({
          icon: 'success',
          title:"Producto Agregado"
        })
        navigate("/");
      })
  }

  const [file, setFile] = useState("")
  const [imgPath, setImgPath] = useState("")
  const [preview, setPreview] = useState("")

  function handleEventUpload() {
    if (file) {
      const dbS = getStorage();
      const refImg = ref(dbS, `productosImgs/${file.name}`)
      uploadBytes(refImg, file)
        .then((res) => {
          setImgPath(res.metadata.fullPath);
          console.log(res.metadata.fullPath);
        })
        .catch((err) => console.log(err))
        .then( async _=>{       
            const refUrl = ref(dbS, `productosImgs/${file.name}`)
            await getDownloadURL(refUrl)
            .then((res)=>{
              console.log(res)
              setPreview(res)
            })     
        })
    } else {
      setImgPath("extrasImgs/imgDefaultProducto.png");
    }
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
                <div className='mb-1'>
                  <input required type='file'
                    onChange={(e) => {
                      setFile(e.target.files[0])
                      console.log(e.target.files[0])
                    }}
                  />
                  <img className='w-25'
                    src={preview}
                    alt="Preview imagen" />
                </div>
                <Button onClick={handleEventUpload}>Upload</Button>
                <div>
                  <FormText>(si no tiene imagen del prodcuto haz click en "Upload para cargar una por defecto")</FormText>
                </div>
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



import { getFirestore, deleteDoc, doc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const DeleteProducto = ({ produtoId, pathImg }) => {

  const navigate = useNavigate();

  function handleEventDelete() {
    console.log(produtoId, pathImg);
    Swal.fire({
      icon: "question",
      title: 'Vas a Eliminar Este Producto',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const dbF = getFirestore();
        const dbS = getStorage();
        deleteDoc(doc(dbF, "productos", `${produtoId}`))
          .then((resElimProducto) => console.log(resElimProducto))
          .catch((err) => console.log(err));
        const desertRef = ref(dbS, `${pathImg}`)
        deleteObject(desertRef)
          .then((resElimImagen) => console.log(resElimImagen))
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        navigate("/productos")
      }else{
        console.log("operaciones abortadas")
      }
    })
      .catch((err) => console.log(err))
      .then(_=>navigate("/"));
  }

  return (
    <div>
      <Button className='btn-danger btn-sm' 
      onClick={handleEventDelete}>Eliminar</Button>
    </div>
  )
}

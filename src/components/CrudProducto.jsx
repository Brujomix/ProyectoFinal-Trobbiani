import React from 'react'
import { FormAddProducto } from './FormAddProducto'
import { FormEditProducto } from './FormEditProducto'
import { FormDeleteProducto } from './FormDeleteProducto'

export const CrudProducto = () => {

  return (
    <div className='contCrudProducto'>
      <div className='CrudProducto'>
        <FormAddProducto/>
        <FormEditProducto/>
        <FormDeleteProducto/>
      </div>
    </div >
  )
}

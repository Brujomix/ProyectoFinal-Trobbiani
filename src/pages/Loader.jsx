import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = _ => {
  return (
    <div className='contLoader'>
        <Spinner animation="border" variant="info" />
    </div>
  )
}

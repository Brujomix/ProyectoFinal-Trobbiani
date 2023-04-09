import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <div className='contLoader'>
      <div>
        <Spinner animation="border" variant="info" />
      </div>
    </div>
  )
}

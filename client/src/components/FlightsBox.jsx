import React from 'react'
import Card from 'react-bootstrap/Card'
import { IoMdCloud } from "react-icons/io";

const FlightsBox = () => {
  return (
    <Card.Body className='container-lg d-flex bg-dark text-center rounded align-items-center justify-content-center py-4 mb-4 mx-auto'>
        <div className='text-center'>
            <IoMdCloud className='display-3'/>
            <p className='fs-2'>Search for flights.</p>
        </div>
    </Card.Body>
  )
}

export default FlightsBox
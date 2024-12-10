import React from 'react'
import Card from 'react-bootstrap/Card'
import { IoMdCloud } from "react-icons/io";

const FlightsBox = () => {
  return (
    <Card.Body className='container-sm d-flex bg-dark m-5 text-center rounded align-items-center justify-content-center'>
        <div className='text-center'>
            <IoMdCloud className='display-3'/>
            <p className='fs-2'>Search for flights.</p>
        </div>
    </Card.Body>
  )
}

export default FlightsBox
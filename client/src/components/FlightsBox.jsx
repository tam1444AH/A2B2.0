import React from 'react'
import { IoMdCloud } from "react-icons/io";
import FlightCard from './FlightCard';


const FlightsBox = ({ flights }) => {
  return (
    <div className='container-lg d-flex flex-column bg-dark text-center rounded align-items-center justify-content-center p-2 mb-4 mx-auto' style={{ height: '50vh'}}>
      <div className='row overflow-auto w-100'>
        {flights.length > 0 ? 
          flights.map((flight, index) => (
            <FlightCard flight={flight} key={index}/>
        )) : (
          <div className='text-center'>
            <IoMdCloud className='display-3'/>
            <p className='fs-2'>Search for flights.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlightsBox;
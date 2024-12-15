import React from 'react'
import { FaHotel } from "react-icons/fa6";
import hotels from "../data/hotels"

const HotelsBox = () => {
  return (
    <div className='container-lg d-flex flex-column bg-dark text-center rounded align-items-center justify-content-center p-2 mb-4 mx-auto' style={{ height: '50vh'}}>
      <div className='row overflow-auto w-100'>
        {/* {flights.flights.length > 0 ? flights.flights.map((flight, index) => (
          <FlightCard flight={flight} key={index}/>
        )) : (
          <div className='text-center'>
            <IoMdCloud className='display-3'/>
            <p className='fs-2'>Search for flights.</p>
          </div>
        )} */}
          <div className='text-center'>
            <FaHotel className='display-3 mb-2'/>
            <p className='fs-2'>Search for hotels.</p>
          </div>
      </div>
    </div>
  )
}

export default HotelsBox;
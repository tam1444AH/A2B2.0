import React from 'react'
import IATAForm from '../components/IATAForm'
import FlightsBox from '../components/FlightsBox'

const Homepage = () => {
  return (
    <div className='d-flex flex-column justify-content-start align-items-center min-vh-100 bg-black text-white pt-3 px-3'>
      <IATAForm />
      <FlightsBox />
    </div>
  )
}

export default Homepage;
import React, { useState }  from 'react'
import HotelsForm from '../components/HotelsForm'
import HotelsBox from '../components/HotelsBox'

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white'>
      <HotelsForm setHotels={setHotels} />
      <HotelsBox hotels={hotels} />
    </div>
  )
}

export default HotelsPage;
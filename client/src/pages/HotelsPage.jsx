import React, { useState }  from 'react'
import HotelsForm from '../components/HotelsForm'
import HotelsBox from '../components/HotelsBox'
import Footer from '../components/Footer'

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-white">
      <div className='flex-grow-1 d-flex flex-column justify-content-evenly align-items-center p-3'>
        <HotelsForm setHotels={setHotels} />
        <HotelsBox hotels={hotels} />
      </div>
      <Footer/>
    </div>
  )
}

export default HotelsPage;
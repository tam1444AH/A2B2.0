import React from 'react'
import HotelsForm from '../components/HotelsForm'
import HotelsBox from '../components/HotelsBox'

const HotelsPage = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg-black text-white'>
      <HotelsForm />
      <HotelsBox />
    </div>
  )
}

export default HotelsPage;
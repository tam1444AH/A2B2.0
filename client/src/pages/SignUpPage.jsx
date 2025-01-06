import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Footer from '../components/Footer'

const SignUpPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-white">
      <div className='flex-grow-1 d-flex flex-column justify-content-evenly align-items-center p-3'>
        <SignUpForm />
      </div>
      <Footer/>
    </div>
  )
}

export default SignUpPage
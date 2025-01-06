import React from 'react'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'

const LoginPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-white">
      <div className='flex-grow-1 d-flex flex-column justify-content-evenly align-items-center p-3'>
        <LoginForm />
      </div>
      <Footer/>
    </div>
  )
}

export default LoginPage
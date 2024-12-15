import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HotelsPage from './pages/HotelsPage'

function App() {
  
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

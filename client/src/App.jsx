import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/signup" element={<h1>Sign Up Page</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

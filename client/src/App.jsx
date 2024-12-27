import './App.css';
import { NavigationBar } from './components/NavigationBar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HotelsPage from './pages/HotelsPage';
import ProfilePage from './pages/ProfilePage';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  
  return (
    <>
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>  
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/hotels" 
              element={
                <PrivateRoute>
                  <HotelsPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/profile'
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;

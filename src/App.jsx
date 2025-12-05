import React from 'react'
import RigesterPage from './components/RigesterPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/animation.css';
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RigesterPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
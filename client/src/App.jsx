import './App.css'

import {Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'

import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import UserHomePage from './pages/UserHomePage'
import SalePage from './pages/SalePage'
import RegisterPage from './pages/RegisterPage'
import ReportsPage from './pages/ReportsPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/user' element={<UserHomePage/>}/>
      <Route path='/sale' element={<SalePage/>}/>
      <Route path='/reports' element={<ReportsPage/>}/>
    </Routes>
  )
}

export default App

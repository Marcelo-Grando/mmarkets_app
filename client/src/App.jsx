import './App.css'

import {Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux'

import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import UserHomePage from './pages/UserHomePage'
import SalePage from './pages/SalePage'
import RegisterPage from './pages/RegisterPage'

function App() {

  const userState = useSelector(state => state.user)

  console.log('userSelector', userState)

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/user' element={<UserHomePage/>}/>
      <Route path='/sale' element={<SalePage/>}/>
    </Routes>
  )
}

export default App

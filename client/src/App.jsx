import './App.css'

import {Routes, Route } from "react-router-dom"

import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import UserHomePage from './pages/UserHomePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path='/user' element={<UserHomePage/>}/>
    </Routes>
  )
}

export default App

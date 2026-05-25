import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import BreastCancer from './pages/BreastCancer'
import CervicalCancer from './pages/CervicalCancer'
import Result from './pages/Result'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/breast-cancer' element={<BreastCancer />} />
        <Route path='/cervical-cancer' element={<CervicalCancer />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home'
import UserAuth from './pages/UserAuth/UserAuth';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<UserAuth/>}/>
        <Route path='/auth/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App

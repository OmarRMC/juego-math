import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/game/Home'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtecRoute'
import CreateAcount from './components/auth/CreateAcount'
import Operaciones from './components/game/Operaciones'
import { ControlOpe } from './context/ControlOpe'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path='/login' />
          <Route element={<CreateAcount />} path='/new_acount' />
          <Route element={
            <ProtectedRoute>
            <Home />
            </ProtectedRoute>
            } path='/' />
          <Route element={
                <ProtectedRoute>
            <ControlOpe>
                <Operaciones />
            </ControlOpe>
            </ProtectedRoute>
            } path='/ope/:complejidad/:preg' />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

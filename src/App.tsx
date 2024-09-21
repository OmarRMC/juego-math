import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Home from './components/game/Home'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtecRoute'
import CreateAcount from './components/auth/CreateAcount'
import Operaciones from './components/game/Operaciones'
import { ControlOpe } from './context/ControlOpe'
import Perfil from './components/game/Perfil'
import Revision from './components/game/Revision'
import Footer from './components/game/Footer'

function App() {
  return (
    <BrowserRouter basename='/juego-math/'>
      <AuthProvider>
      <ControlOpe>
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
                <Operaciones />              
            </ProtectedRoute>
          } path='/ope/:complejidad/:preg' />
          <Route
          element={<Revision/>}
          path='/Revision'
           >
          </Route>
          <Route element={
              <Perfil />
          } path='/Perfil'></Route>
        </Routes>
        </ControlOpe>
      </AuthProvider>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App

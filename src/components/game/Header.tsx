import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
  const {salir, auth}= useAuth();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>          
          <Link to="/" className='me-3 text-light' ><strong>Math</strong></Link>            
          <Nav className="me-auto d-flex align-items-center gap-3">            
              <Link to="/Perfil"> Perfil</Link>            
              <Link to="/Revision"> Ultima revision</Link>            
          </Nav>
          <Navbar.Brand href="#">{auth?.nombre}</Navbar.Brand>
          <Button onClick={salir}>Salir </Button>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;
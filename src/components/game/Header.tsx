import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const {salir, auth}= useAuth();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Math</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Perfil</Nav.Link>
            <Nav.Link href="#features">Puntuaciones</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home">{auth?.nombre}</Navbar.Brand>
          <Button onClick={salir}>Salir </Button>
        </Container>
      </Navbar>

    </>
  );
}

export default Header;
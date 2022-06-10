import React from 'react';
import {
  Navbar, Container, Nav, Button
} from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { userLogout } from '../../requests';

export function NavBar() {
  const currentLocation = useLocation();
  const history = useHistory();

  const logout = async () => {
    sessionStorage.removeItem('Token');
    const res = await userLogout();
    if (res.status === 200) {
      history.push('/auth');
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => history.push('/')}>
          PBE Admin
        </Navbar.Brand>
        <Nav className="ms-auto">
          {currentLocation.pathname !== '/auth' ? <Nav.Link onClick={logout}><Button variant="danger">Logout</Button></Nav.Link> : null}
        </Nav>
      </Container>
    </Navbar>
  );
}

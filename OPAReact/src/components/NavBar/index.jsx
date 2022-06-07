import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

export function NavBar() {
  const currentLocation = useLocation();
  const history = useHistory();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">OPA admin</Navbar.Brand>
        <Nav className="ms-auto">
          {currentLocation.pathname === '/' ? <Nav.Link onClick={() => history.push('/add')}>Add Item</Nav.Link> : null}
        </Nav>
      </Container>
    </Navbar>
  );
}

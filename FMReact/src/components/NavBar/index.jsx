import React from 'react';
import {
  Navbar, Container, Nav, Button
} from 'react-bootstrap';
import {
  faBell,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userLogout } from '../../requests';

export function NavBar() {
  const currentLocation = useLocation();
  const history = useHistory();

  const logout = async () => {
    sessionStorage.removeItem('Token');
    const res = await userLogout();
    if (res.status === 200) {
      toast.success('Logged Out');
      history.push('/auth');
    } else {
      toast.error('Logout Failed');
    }
  };
  return (
    <div style={{
      paddingBottom: '4px',
      backgroundColor: '#ffcd41'
    }}
    >
      <Navbar
        style={{
          backgroundColor: '#d71e28'
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand onClick={() => history.push('/')}>
            File Management
          </Navbar.Brand>
          <Nav className="ms-auto">
            {currentLocation.pathname !== '/auth' ? (
              <>
                <Nav.Link>
                  <Button variant="outline-light" onClick={() => history.push('/notifications')}>
                    <FontAwesomeIcon icon={faBell} />
                  </Button>
                </Nav.Link>
                <Nav.Link onClick={logout}>
                  <Button variant="outline-light">
                    <FontAwesomeIcon icon={faSignOut} />
                  </Button>
                </Nav.Link>
              </>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

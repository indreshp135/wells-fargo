import React, { useEffect, useState } from 'react';
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
import { userLogout, getUserDisplayDetails, getUserDetails } from '../../requests';

export function NavBar() {
  const currentLocation = useLocation();
  const history = useHistory();
  const [name, setName] = useState('');
  const [sod, setSod] = useState('');
  useEffect(async () => {
    setName('');
    setSod('');
    const [resp, r] = await Promise.all([getUserDisplayDetails(), getUserDetails()]);
    if (resp.status === 200) {
      setSod(JSON.parse(resp.data.data[0])[0].sod_name);
    }
    if (r.status === 200) {
      setName(`${r.data.first_name} ${r.data.last_name}`);
    }
  }, [currentLocation.pathname]);

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
          {currentLocation.pathname !== '/auth' ? (
            <>
              <div className="mx-auto text-black px-3 bg-warning" style={{ borderRadius: '8px' }}>
                Name:
                {' '}
                {name}
              </div>
              {' '}
              <div className=" text-black px-3 bg-warning rounded-5 " style={{ borderRadius: '8px' }}>
                SOD:
                (
                {sod}
                )
              </div>
            </>
          ) : null}
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

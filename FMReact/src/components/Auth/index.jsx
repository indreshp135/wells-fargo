import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Row, Col, Container, Form
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { GAUTH_URL } from '../../urls';
import './style.css';
import { getUserDetails, googleAuth, userLogin } from '../../requests';

export function AuthPage() {
  const history = useHistory();

  // check if already authenticated
  useEffect(async () => {
    if (sessionStorage.getItem('Token')) {
      const res = await getUserDetails();
      if (res.status === 200 && res.data.username) {
        history.push('/');
      }
    }
  });

  const handleLoginGAuth = async (accessToken) => {
    const data = {
      access_token: accessToken
    };
    toast.warn('Waiting for Authentication', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    try {
      const res = await googleAuth(data);
      if (res.status === 200 && res.data.key) {
        sessionStorage.setItem('Token', res.data.key);
        toast.success('Authentication Success', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => history.push('/'), 100);
      } else {
        toast.error('Authentication Failed', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } catch (err) {
      toast.error('Authentication Failed', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const loginWithDauth = () => {
    window.open(
      GAUTH_URL,
      '_blank',
      'width=600, height=800'
    );
    window.addEventListener('message', (event) => {
      if (typeof event.data === 'string') {
        const accessToken = event.data.split('=')[1];
        handleLoginGAuth(accessToken.split('&')[0]);
      }
    });
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmail = async () => {
    const data = {
      username,
      password
    };
    toast.warn('Waiting for Authentication', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    try {
      const res = await userLogin(data);
      if (res.status === 200 && res.data.key) {
        sessionStorage.setItem('Token', res.data.key);
        toast.success('Authentication Success', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setTimeout(() => history.push('/'), 100);
      } else {
        toast.success('Authentication Failed', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } catch (err) {
      toast.error('Authentication Failed', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  return (
    <Container className="gauth-container">
      <Row>
        <Col className="d-flex justify-content-center border-end">
          <Button
            variant="light"
            className="gauth-button"
            onClick={loginWithDauth}
          >
            <img
              className="logo-gauth"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt="Google Logo"
            />
            <span>
              Login with Google
            </span>
          </Button>
        </Col>
        <Col className="d-flex justify-content-center border-start">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="name" onChange={(e) => { setUsername(e.target.value); }} placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
            </Form.Group>
            <div className="text-center">
              <Button variant="outline-warning" type="button" onClick={loginWithEmail}>
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

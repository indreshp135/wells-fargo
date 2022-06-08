import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { GAUTH_URL } from '../../urls';
import './style.css';
import { getUserDetails, googleAuth } from '../../requests';

export function AuthPage() {
  const history = useHistory();

  // check if already authenticated
  useEffect(async () => {
    const res = await getUserDetails();
    if (res.status === 200) {
      history.push('/');
    }
  });

  const handleLoginGAuth = async (accessToken) => {
    const data = {
      access_token: accessToken
    };

    const res = await googleAuth(data);
    if (res.status === 200 && res.data.key) {
      sessionStorage.setItem('Token', res.data.key);
      history.push('/');
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

  return (
    <div className="gauth-button-container">
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
    </div>
  );
}

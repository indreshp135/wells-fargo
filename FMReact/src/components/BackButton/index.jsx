import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';

export function BackButton() {
  const history = useHistory();
  const location = useLocation();
  return (
    location.pathname === '/' || location.pathname === '/auth' ? null : (
      <Button
        variant="outline-secondary"
        style={
          {
            position: 'fixed',
            bottom: '0',
            right: '0',
            margin: '30px',
            borderRadius: '50%',
            zIndex: '100'
          }
        }
        onClick={() => history.goBack()}
      >
        <FontAwesomeIcon icon={faLeftLong} size="3x" />
      </Button>
    )
  );
}

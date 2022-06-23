import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styles from './style.module.css';

export default function Boxes({ applications }) {
  const history = useHistory();

  return (
    <div className={styles.deck}>
      {applications.map(({
        application_name: applicationName,
        application_hash: applicationHash
      }) => (
        <Button
          variant="light"
          key={applicationName}
          className={styles.box}
          onClick={() => history.push(`/applications/${applicationHash}/`)}
        >
          <FontAwesomeIcon icon={faCalendarCheck} size="3x" />
          <h3>{applicationName}</h3>
        </Button>
      ))}
    </div>
  );
}

Boxes.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape({
    application_name: PropTypes.string,
    application_hash: PropTypes.string
  })).isRequired
};

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';
import { getApplications } from '../../requests';

export default function Boxes() {
  const history = useHistory();
  const [applications, setApplications] = React.useState([]);

  useEffect(async () => {
    const res = await getApplications();
    setApplications(res.data);
  }, []);

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
          onClick={() => history.push(`/applications/${applicationHash}`)}
        >
          <FontAwesomeIcon icon={faCalendarCheck} size="3x" />
          <h3>{applicationName}</h3>
        </Button>
      ))}
    </div>
  );
}

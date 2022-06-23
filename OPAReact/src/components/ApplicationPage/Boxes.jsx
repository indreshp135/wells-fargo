import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCalendar,
  faUsers,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';

export default function Boxes() {
  const history = useHistory();
  const box = [
    { name: 'Actions & Asset', icon: faPlus, link: 'actions-assets/' },
    { name: 'SOD', icon: faCalendar, link: 'sod/' },
    { name: 'Exceptions', icon: faUsers, link: 'exception/' },
    { name: 'Add users', icon: faUser, link: 'addUser/' }
  ];

  return (

    <div className={styles.deck}>
      {box.map(({ name, icon, link }) => (
        <Button
          variant="light"
          key={name}
          className={styles.box}
          onClick={() => history.push(link)}
        >
          <FontAwesomeIcon icon={icon} size="3x" />
          <h3>{name}</h3>
        </Button>
      ))}
    </div>

  );
}

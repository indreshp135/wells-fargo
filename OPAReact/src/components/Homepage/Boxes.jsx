/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCalendar,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';

const box = [
  { name: 'Actions & Asset', icon: faPlus, link: '/actions-assets' },
  { name: 'SOD', icon: faCalendar, link: '/sod' },
  { name: 'Exceptions', icon: faUsers, link: '/exception' }
];

export default function Boxes() {
  const history = useHistory();

  return (
    <div className={styles.deck}>
      {box.map(({ name, icon, link }) => (
        <div
          key={name}
          className={styles.box}
          onClick={() => history.push(link)}
        >
          <FontAwesomeIcon icon={icon} size="3x" />
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  );
}

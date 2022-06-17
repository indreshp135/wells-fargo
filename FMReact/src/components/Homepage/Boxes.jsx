import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styles from './style.module.css';

export default function Boxes({ folders }) {
  const history = useHistory();

  return (
    <div className={styles.deck}>
      {folders.map(({ folder_name: folderName, folder_slug: folderSlug }) => (
        <Button
          variant="light"
          key={folderName}
          className={styles.box}
          onClick={() => history.push(`folder/${folderSlug}`)}
        >
          <FontAwesomeIcon icon={faFolder} size="3x" />
          <h3>{folderName}</h3>
        </Button>
      ))}
    </div>
  );
}

Boxes.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    folder_name: PropTypes.string.isRequired,
    folder_slug: PropTypes.string.isRequired
  })).isRequired
};

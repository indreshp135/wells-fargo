import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchange,
  faFile, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import styles from './style.module.css';
import { MEDIA_URL } from '../../urls';

export default function Boxes({ files, folder, deleteFile }) {
  return (
    <div className={styles.deck}>
      {files.map(({ file_name: name, file_random_name: fileRandomName }) => (
        <div
          variant="light"
          key={fileRandomName}
          className={styles.box}
        >
          <a style={{ textDecoration: 'none', color: 'black' }} href={`${MEDIA_URL}${folder}/${fileRandomName}.${name.split('.').pop()}`} download={name}>
            <FontAwesomeIcon icon={faFile} size="3x" />
            <h3>
              {name}
            </h3>
          </a>
          <div>
            <Button
              variant="outline-danger"
              onClick={() => deleteFile(fileRandomName)}
              className="m-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button variant="outline-warning" className="m-2"><FontAwesomeIcon icon={faExchange} className={styles.small} /></Button>
          </div>
        </div>
      ))}
    </div>
  );
}

Boxes.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    file_name: PropTypes.string.isRequired,
    file_random_name: PropTypes.string.isRequired
  })).isRequired,
  folder: PropTypes.string.isRequired,
  deleteFile: PropTypes.func.isRequired
};

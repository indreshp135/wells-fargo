import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchange,
  faFile, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import styles from './style.module.css';
import { MEDIA_URL } from '../../urls';
import { transferRequest } from '../../requests';

export default function Boxes({
  files, folder, deleteFile, folders
}) {
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState('');
  const handleClose = () => setShow(false);
  const [folderChosen, setFolder] = React.useState('');

  const transfer = (fileRandomName) => {
    setShow(true);
    setFile(fileRandomName);
  };

  const requestTransfer = async () => {
    const data = {
      file_random_name: file,
      destination_folder: folderChosen
    };
    const res = await transferRequest(data);
    if (res.status === 200) {
      setShow(false);
      setFile('');
      setFolder('');
      toast.success('File transfer Request sent successfully');
    } else {
      toast.error('Error transferring file');
    }
  };

  return (
    <>
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
              <Button onClick={() => transfer(fileRandomName)} variant="outline-warning" className="m-2"><FontAwesomeIcon icon={faExchange} className={styles.small} /></Button>
            </div>
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Destination Folder Name</Form.Label>
              <Form.Control
                as="select"
                name="folder_name"
                onChange={(e) => setFolder(e.target.value)}
                required
              >
                <option
                  value={folderChosen}
                >
                  Select Folder
                </option>
                {folders.map(({ folder_name: name, folder_slug: slug }) => (
                  <option key={name} value={slug}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="warning" onClick={requestTransfer}>
                Add
              </Button>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Boxes.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    file_name: PropTypes.string.isRequired,
    file_random_name: PropTypes.string.isRequired
  })).isRequired,
  folder: PropTypes.string.isRequired,
  deleteFile: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.shape({
    folder_name: PropTypes.string.isRequired
  })).isRequired
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  Button, Container, Modal, Form
} from 'react-bootstrap';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Boxes from './Boxes';
import { getFiles, deleteFile, createFile } from '../../requests';

export function FolderPage() {
  const location = useParams();
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [files, setFiles] = React.useState([]);

  useEffect(async () => {
    const response = await getFiles(location.name);
    if (response.status === 200) {
      setFiles(response.data);
    }
  }, []);

  const delFile = async (fileRandomName) => {
    const response = await deleteFile(fileRandomName);
    if (response.status === 204) {
      const newFiles = files.filter((
        { file_random_name: fileName }
      ) => fileName !== fileRandomName);
      setFiles(newFiles);
      toast.success('File deleted successfully');
    } else {
      toast.error('Error deleting file');
    }
  };

  const submitFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_slug', location.name);
    const res = await createFile(formData);
    if (res.status === 201) {
      setShow(false);
      setFile('');
      setFiles([...files, res.data]);
      toast.success('File uploaded successfully');
    } else {
      toast.error('Error uploading file');
    }
  };

  return (
    <>
      <Container className="m-3">
        <div className="d-flex justify-content-end">
          <Button variant="outline-warning" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            {' '}
            Add new File
          </Button>
        </div>
        <div className="text-center">
          <h1>{location.name.toUpperCase()}</h1>
          <Boxes files={files} folder={location.name} deleteFile={delFile} />
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="warning" onClick={submitFile}>
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

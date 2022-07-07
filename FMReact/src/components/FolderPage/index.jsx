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
import {
  getFiles, deleteFile, createFile, getFolders, deletePermissionFile, createPermissionFile
} from '../../requests';
import { checkActionAccess } from '../../redux/utils/checkAccess';

export function FolderPage() {
  const location = useParams();
  const [show, setShow] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const handleClose = () => setShow(false);
  const [showDel, setShowDel] = React.useState(0);
  const [showTra, setShowTra] = React.useState(0);
  const handleShow = () => {
    // location = location[0].charAt(0).toUpperCase() + location.slice(1);
    if (checkActionAccess('WRITE', location.name.toUpperCase())) {
      setShow(true);
    } else {
      toast.error('Access denied to upload file');
    }
  };

  const [files, setFiles] = React.useState([]);
  const [folders, setFolders] = React.useState([]);

  useEffect(async () => {
    let response = await getFiles(location.name);
    if (response.status === 200) {
      if (checkActionAccess('READ', location.name.toUpperCase())) {
        setFiles(response.data);
      } else {
        toast.error('You do not have read permission for this page');
      }
    }
    response = await getFolders();
    if (response.status === 200) {
      const otherFolders = response.data.filter((folder) => folder.folder_slug !== location.name);
      setFolders(otherFolders);
    }
    setShowDel(checkActionAccess('DELETE', location.name.toUpperCase()));
    setShowTra(checkActionAccess('TRANSFER', location.name.toUpperCase()));
  }, []);

  const delFile = async (fileRandomName) => {
    let response;
    if (showDel === 2) {
      response = await deleteFile(fileRandomName);
    } else if (showDel === 1) {
      response = await deletePermissionFile(fileRandomName);
    }
    if (response.status === 204 || response.status === 200) {
      if (showDel === 2) {
        const newFiles = files.filter((
          { file_random_name: fileName }
        ) => fileName !== fileRandomName);
        setFiles(newFiles);
      }
      toast.success(response.data.message);
    } else {
      toast.error('Error deleting file');
    }
  };

  const submitFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_slug', location.name);
    let res;
    if (checkActionAccess('WRITE', location.name.toUpperCase()) === 2) {
      res = await createFile(formData);
    } else if (checkActionAccess('WRITE', location.name.toUpperCase()) === 1) {
      res = await createPermissionFile(formData);
    }
    if (res.status === 201) {
      setShow(false);
      setFile('');
      setFiles([...files, res.data]);
      toast.success(res.data.message);
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
          <Boxes
            files={files}
            folders={folders}
            folder={location.name}
            deleteFile={delFile}
            showDel={showDel}
            showTra={showTra}
          />
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Upload file</Form.Label>
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

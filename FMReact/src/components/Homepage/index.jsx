import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  Button, Container, Modal, Form
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Boxes from './Boxes';
import { createFolder, getFolders, getAccessList } from '../../requests';
// import store from '../../redux/store';
import { getAccess } from '../../redux/actions/AccessActions';
import { filterAssetAccess } from '../../redux/utils/checkAccess';

export function Homepage() {
  const [show, setShow] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [folders, setFolders] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(async () => {
    const resp = await getAccessList();
    dispatch(getAccess(resp.data));

    const response = await getFolders();
    if (response.status === 200) {
      setFolders(filterAssetAccess(response.data));
    }
  }, []);

  const submitFolder = async () => {
    const data = {
      folder_name: folderName
    };
    const res = await createFolder(data);
    if (res.status === 201) {
      setShow(false);
      setFolderName('');
      setFolders([...folders, res.data]);
      toast.success('Folder created successfully');
    }
  };
  return (
    <>
      {' '}
      <Container className="m-3">
        <div className="d-flex justify-content-end">
          <Button variant="outline-warning" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            {' '}
            Add new Folder
          </Button>
        </div>
        <div className="text-center">
          <Boxes folders={folders} />
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
              <Form.Control type="name" placeholder="Enter Folder name" onChange={(e) => setFolderName(e.target.value)} />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="warning" onClick={submitFolder}>
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

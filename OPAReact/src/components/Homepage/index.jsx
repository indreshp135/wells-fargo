import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import {
  faClone,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  Button, Container, Modal, Form, InputGroup
} from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import Boxes from './Boxes';
import { postApplication, getApplications } from '../../requests';

export function Homepage() {
  const [show, setShow] = React.useState(false);
  const [showClip, setshowClip] = React.useState(false);
  const [applicationName, setApplicationName] = React.useState('');
  const [applicationDescription, setApplicationDescription] = React.useState('');
  const [applicationHash, setApplicationHash] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [applications, setApplications] = React.useState([]);

  useEffect(async () => {
    const res = await getApplications();
    setApplications(res.data);
  }, []);

  const submitApplication = async () => {
    setshowClip(true);
    const data = {
      application_name: applicationName,
      application_description: applicationDescription
    };
    const res = await postApplication(data);
    if (res.status === 201) {
      setApplications([...applications, res.data]);
      setApplicationHash(res.data.application_hash);
    }
  };
  return (
    <>
      {' '}
      <Container className="my-3">
        <div className="d-flex justify-content-end">
          <Button variant="outline-warning" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            {' '}
            Add new Application
          </Button>
        </div>
        <div className="text-center">
          <h1>List of Applications</h1>
          <Boxes applications={applications} />
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Application Name</Form.Label>
              <Form.Control type="name" placeholder="Enter application name" onChange={(e) => setApplicationName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Application Description</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={(e) => setApplicationDescription(e.target.value)} />
            </Form.Group>
            {showClip && (
              <InputGroup>
                <Form.Control value={applicationHash} readOnly />
                <InputGroup.Text>
                  <CopyToClipboard text={applicationHash} onCopy={() => setCopied(true)}>
                    <FontAwesomeIcon icon={faClone} color={copied ? 'green' : 'black'} />
                  </CopyToClipboard>
                </InputGroup.Text>
              </InputGroup>
            )}
            {copied && <p className="text-success">Copied to clipboard</p>}
            {!showClip && (
              <div className="d-flex justify-content-center">
                <Button variant="warning" onClick={submitApplication}>
                  Add
                </Button>
              </div>
            )}
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

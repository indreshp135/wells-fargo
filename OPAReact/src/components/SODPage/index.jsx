import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import {
  ListGroup, Container, Row, Col, Button, Modal, Form
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useParams } from 'react-router';
import { EachSOD } from './eachSOD';
import {
  getSOD, postSOD
} from '../../requests';

export function SODPage() {
  const { hash } = useParams();
  const [sodList, setSOD] = useState([]);
  const [show, setShow] = useState(false);
  const [desig, changeDesig] = useState('');
  const [loc, changeLoc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    const res = await getSOD(hash);
    if (res.status === 200) {
      setSOD(res.data);
    }
  }, []);

  async function updateDelete() {
    const res = await getSOD(hash);
    if (res.status === 200) {
      setSOD(res.data);
    }
  }
  async function handleCreateSOD() {
    const sodName = `${desig}/${loc}`;
    const response = await postSOD({ sod_name: sodName, application_hash: hash });

    if (response.status === 200) {
      toast.success(`Added new SOD ${{ sodName }}`);
    }
  }
  return (
    <Container className="my-3">
      <div className="d-flex justify-content-end">
        <Button variant="outline-warning" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} />
          {' '}
          Add new SOD
        </Button>
      </div>
      <h1 className="text-center">List Of SODs</h1>
      <Row>
        <Col className="mx-auto mt-3" lg={5}>
          <ListGroup as="ol" numbered>
            {sodList.map((sod) => <EachSOD sodName={sod.sod_name.split('/')[0]} sodCode={sod.sod_code} key={sod.sod_code} location={sod.sod_name.split('/')[1]} updateDelete={() => updateDelete()} />)}
          </ListGroup>
        </Col>

      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new SOD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Designation</Form.Label>
              <Form.Control required type="text" placeholder="Ex: Manager" onChange={(e) => changeDesig(e.target.value)} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location</Form.Label>
              <Form.Control required type="text" placeholder="Ex: Banglore" onChange={(e) => changeLoc(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={() => handleCreateSOD()}>
              Add SOD
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </Container>

  );
}

import React, { useEffect, useState } from 'react';
import {
  ListGroup, Container, Row, Col, Button, Modal, Form
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import { EachSOD } from './eachSOD';
import {
  getSOD, postSOD
} from '../../requests';

export function SODPage() {
  const [sodList, setSOD] = useState([]);
  const [show, setShow] = useState(false);
  const [desig, changeDesig] = useState('');
  const [loc, changeLoc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    const res = await getSOD();
    if (res.status === 200) {
      setSOD(res.data);
    }
  }, []);

  async function updateDelete() {
    const res = await getSOD();
    if (res.status === 200) {
      setSOD(res.data);
    }
  }
  async function handleCreateSOD() {
    const sodName = `${desig}/${loc}`;
    const response = await postSOD({ sod_name: sodName });

    if (response.status === 200) {
      toast.success(`Added new SOD ${{ sodName }}`);
    }
  }
  return (
    <Container>
      <h1 className="text-center mt-5">List Of SODs</h1>
      <Row>
        <Col className="mx-auto mt-3" lg={5}>
          <ListGroup as="ol" numbered>
            {sodList.map((sod) => <EachSOD sodName={sod.sod_name.split('/')[0]} sodCode={sod.sod_code} location={sod.sod_name.split('/')[1]} updateDelete={() => updateDelete()} />)}
          </ListGroup>

          <div className="mt-3"><Button variant="success" onClick={handleShow}>Add New SOD</Button></div>
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </Container>

  );
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { Button, Container, Form } from 'react-bootstrap';
import {
  getSOD, getUserExist, postSodUser
} from '../../requests';

export function AddUsersPage() {
  const { hash } = useParams();
  const [sodList, setSOD] = useState([]);
  const [email, setEmail] = useState('');
  const [userSod, setUserSod] = useState('rand');
  useEffect(async () => {
    const res = await getSOD(hash);
    if (res.status === 200) {
      setSOD(res.data);
    }
  }, []);

  function emailRegex(val) {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mailformat.test(val)) {
      return true;
    }
    toast.error('Enter valid email id');
    return false;
  }
  async function controlSubmit() {
    if (userSod === 'rand') {
      toast.error('Kindly select SOD for project');
    } else if (emailRegex(email)) {
      const q = `email=${email}`;
      const response = await getUserExist(q);
      if (response.status === 200) {
        if (response.data.length !== 0) {
          const curSod = sodList.filter((sod) => sod.sod_code.toString() === userSod.toString());
          const curSodId = curSod[0].sod_code;

          const r = await postSodUser(
            { user_id: response.data[0].user_id, sod_code: curSodId, application_hash: hash }
          );
          if (r.status === 201) {
            toast.success('Successfully added user to application');
          } else {
            toast.error('Error adding user to application');
          }
        } else {
          toast.error('User does not exist. Kindly provide the correct email');
        }
      }
    }
  }
  return (
    <Container className="w-25 mt-5">
      <h1>Add new user</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" onChange={(e) => { setEmail(e.target.value); }} placeholder="Enter email" />
          <Form.Text className="text-muted">
            Well never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSOD">
          <Form.Label>SOD</Form.Label>
          <Form.Select required onChange={(e) => { setUserSod(e.target.value); }}>
            <option value="rand">Select Sod</option>
            {sodList.map((sod) => <option value={sod.sod_code}>{sod.sod_name}</option>)}

          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="button" onClick={() => controlSubmit()}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

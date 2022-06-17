import React, { useEffect } from 'react';
import {
} from '@fortawesome/free-solid-svg-icons';
import {
  Container, Form, Button
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getUsers, getActions, getAssets, postExceptions, getException, updateException
} from '../../requests';

export function AddExceptionsPage() {
  const { hash, exceptionId } = useParams();
  const history = useHistory();
  const [assets, setAssets] = React.useState([]);
  const [selectedAsset, setSelectedAsset] = React.useState('');
  const [exceptionDescription, setExceptionDescription] = React.useState('');
  const [exceptionName, setExceptionName] = React.useState('');
  const [actions, setActions] = React.useState([]);
  const [selectedAction, setSelectedAction] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState('');

  useEffect(async () => {
    let res = await getAssets(hash);
    if (res.status === 200) {
      setAssets(res.data);
    }
    res = await getActions(hash);
    if (res.status === 200) {
      setActions(res.data);
    }
    res = await getUsers();
    if (res.status === 200) {
      setUsers(res.data);
    }
    if (exceptionId) {
      res = await getException(exceptionId);
      if (res.status === 200) {
        setExceptionDescription(res.data.exception_rule_description);
        setExceptionName(res.data.exception_rule_name);
        setSelectedAsset(res.data.asset_id);
        setSelectedAction(res.data.action_id);
        setSelectedUser(res.data.exception_for_email);
      }
    }
  }, []);

  const addException = async () => {
    if (!exceptionId) {
      const res = await postExceptions({
        exception_rule_name: exceptionName,
        exception_rule_description: exceptionDescription,
        asset_id: selectedAsset,
        action_id: selectedAction,
        exception_for_email: selectedUser,
        application_hash: hash
      });
      if (res.status === 201) {
        setExceptionDescription('');
        setExceptionName('');
        setSelectedAsset('');
        setSelectedAction('');
        setSelectedUser('');

        toast.success('New Exception Added');
      } else {
        toast.error('Exception Add Failed');
      }
    } else {
      const res = await updateException(exceptionId, {
        exception_rule_name: exceptionName,
        exception_rule_description: exceptionDescription,
        asset_id: selectedAsset,
        action_id: selectedAction,
        exception_for_email: selectedUser,
        application_hash: hash
      });
      if (res.status === 200) {
        setExceptionDescription('');
        setExceptionName('');
        setSelectedAsset('');
        setSelectedAction('');
        setSelectedUser('');

        toast.success('Exception Updated');
        history.push('..');
      } else {
        toast.error('Exception Update Failed');
      }
    }
  };

  return (
    <Container className="m-3">
      <div className="text-center">
        <h1>
          {!exceptionId ? 'Add ' : 'Update '}
          Exception
        </h1>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name of the Exception</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name of the Exception"
            value={exceptionName}
            onChange={(e) => setExceptionName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description of the Exception</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description of the Exception"
            value={exceptionDescription}
            onChange={(e) => setExceptionDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Asset</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedAsset(e.target.value)}
            value={selectedAsset}
          >
            <option value="">Select Asset</option>
            {assets.map((asset) => (
              <option key={asset.asset_id} value={asset.asset_id}>{asset.asset_name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Action</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedAction(e.target.value)}
            value={selectedAction}
          >
            <option value="">Select Action</option>
            {actions.map((action) => (
              <option key={action.action_id} value={action.action_id}>{action.action_name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setSelectedUser(e.target.value)}
            value={selectedUser}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.email} value={user.email}>{user.email}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="text-center">
          <Button variant="outline-warning" onClick={addException}>
            {!exceptionId ? 'Add ' : 'Update '}
            Exception
          </Button>
        </div>
      </Form>
    </Container>
  );
}

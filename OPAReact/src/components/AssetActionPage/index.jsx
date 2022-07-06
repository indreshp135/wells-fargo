import React, { useEffect } from 'react';
import {
  Container, Col, Row, InputGroup, FormControl, Button, ListGroup
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  getAssets, getActions, postAction, postAsset
} from '../../requests';

export function AssetActionPage() {
  const { hash } = useParams();
  const [Assets, setAssets] = React.useState([]);
  const [Actions, setActions] = React.useState([]);

  const [Asset, setAsset] = React.useState('');
  const [Action, setAction] = React.useState('');

  useEffect(async () => {
    const resAsset = await getAssets(hash);
    if (resAsset.status === 200) {
      setAssets(resAsset.data);
    }
    const resAction = await getActions(hash);
    if (resAction.status === 200) {
      setActions(resAction.data);
    }
  }, []);

  const addAsset = async () => {
    const res = await postAsset({ asset_name: Asset.toUpperCase(), application_hash: hash });
    if (res.status === 201) {
      setAssets([...Assets, res.data]);
      toast.success('New Asset Added');
    } else {
      toast.error('Asset Add Failed');
    }
  };

  const addAction = async () => {
    const res = await postAction({ action_name: Action.toUpperCase(), application_hash: hash });
    if (res.status === 201) {
      setActions([...Actions, res.data]);
      toast.success('New Action Added');
    } else {
      toast.error('Action Add Failed');
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className="text-center">
          <div className="m-5">
            <h1>Assets</h1>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Asset Name"
                aria-label="Asset Name"
                onChange={(e) => setAsset(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addAsset();
                    e.target.value = '';
                  }
                }}
              />
              <Button variant="warning" onClick={addAsset}>Add</Button>
            </InputGroup>
            <ListGroup>
              {Assets.map((asset) => (
                <ListGroup.Item key={asset.asset_id}>{asset.asset_name}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col lg={6} className="text-center">
          <div className="m-5">
            <h1>Actions</h1>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Action Name"
                aria-label="Action Name"
                onChange={(e) => setAction(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addAction();
                    e.target.value = '';
                  }
                }}
              />
              <Button variant="warning" onClick={addAction}>Add</Button>
            </InputGroup>
            <ListGroup>
              {Actions.map((action) => (
                <ListGroup.Item key={action.action_id}>{action.action_name}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

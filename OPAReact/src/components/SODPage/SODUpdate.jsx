import React, { useEffect } from 'react';
import {
  Container, Col, Row, Modal, Button
} from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import styles from './styles.module.css';
import {
  getActions, getAssets, getSODRules, postSODRules, deleteSODRules, geteachSODRules
} from '../../requests';

const curEle = [];
export function SODUpdate() {
  const { hash } = useParams();

  const [Assets, setAssets] = React.useState([]);
  const [Actions, setActions] = React.useState([]);
  const { sodId } = useParams();
  const [show, setShow] = React.useState(false);
  const [exists, setExsists] = React.useState([]);

  const handleClose = () => {
    setShow(false);

    // Also pop array contents if the modal is closed without selecting anything
    if (curEle.length !== 0) {
      while (curEle.length !== 0) curEle.pop();
    }
  };
  const handleShow = () => setShow(true);
  function findChecked(assetId, actionId) {
    const arr = exists.filter((o) => ((o.asset_id === assetId) && (o.action_id === actionId)));

    if (arr.length === 0) return false;
    return true;
  }
  function findChecked2(assetId, actionId) {
    const arr = exists.filter((o) => (
      o.asset_id.toString() === assetId) && (o.action_id.toString() === actionId));

    if (arr.length === 0) return false;
    return true;
  }
  async function createRule(perm) {
    // Process array and pop contents
    const actionId = curEle[0].action_id;
    const assetId = curEle[0].asset_id;
    const actionName = curEle[0].action_name;
    const assetName = curEle[0].asset_name;

    curEle.pop();
    const query = `sodCode=${sodId}&actionId=${actionId}&assetId=${assetId}`;
    const resp = await getSODRules(query);

    if (resp.status === 200) {
      // Create the rule if such a rule doesn't exist
      if (resp.data.length === 0) {
        const response = await postSODRules(

          {
            action_id: actionId, asset_id: assetId, sod_code: sodId, sod_rule_name: actionName, sod_rule_description: `${actionName} ${assetName}`, sod_rule_approval_required: perm
          }

        );

        if (response.status === 201) {
          toast.success('Rule added successfully');
        }
      } else { // Delete the rule as the rule is present and has to be deleted
        const sodRuleId = resp.data[0].sod_rule_id;
        const res = await deleteSODRules(sodRuleId);

        if (res.status === 204) {
          toast.success('Rule deleted successfully');
        }
      }
    }

    const q = `sodCode=${sodId}`;
    const res = await geteachSODRules(q);

    if (res.status === 200) {
      setExsists(res.data);
    }
    handleClose();
  }
  async function updateSODRuleFunc(e) {
    const actionId = e.target.getAttribute('data-action');
    const assetId = e.target.getAttribute('data-asset');
    const actionName = e.target.getAttribute('data-actionname');
    const assetName = e.target.getAttribute('data-assetname');
    const isChecked = findChecked2(assetId, actionId);
    curEle.push({
      action_id: actionId, asset_id: assetId, action_name: actionName, asset_name: assetName
    });
    // Modal for permission
    // isChecked finds if checkbox is already checked. Need not open modal if checked already
    if (!isChecked) { handleShow(); } else createRule(true);
  }

  useEffect(async () => {
    const resAsset = await getAssets(hash);
    if (resAsset.status === 200) {
      setAssets(resAsset.data);
    }
    const resAction = await getActions(hash);
    if (resAction.status === 200) {
      setActions(resAction.data);
    }
    const q = `sodCode=${sodId}`;
    const res = await geteachSODRules(q);

    if (res.status === 200) {
      setExsists(res.data);
    }
  }, []);
  return (
    <Container>
      <Row className="mt-5 float-right">

        <Col className="text-center" lg={2}>
          <h3>Edit SOD Rules </h3>
        </Col>
      </Row>
      <Container style={{ borderRadius: '15px' }} className="mx-auto border border-dark mt-3 pt-3 bg-white text-center">
        <Row className="mb-5">
          <Col />
          {Actions.map((action) => (
            <Col className={styles.sod} key={action.action_id}>{action.action_name}</Col>
          ))}

        </Row>

        {Assets.map((asset) => (
          <Row className="mb-5" key={asset.asset_id}>
            <Col className={styles.sod}>{asset.asset_name}</Col>
            {Actions.map((action) => {
              const a = findChecked(asset.asset_id, action.action_id);
              return <Col><input data-action={action.action_id} checked={a ? 'checked' : ''} data-actionname={action.action_name} data-asset={asset.asset_id} data-assetname={asset.asset_name} key={action.action_id} onChange={(e) => updateSODRuleFunc(e)} type="checkbox" /></Col>;
            })}
          </Row>
        ))}

      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Require permission for access?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Button className="mx-5" variant="success" onClick={() => createRule(true)}>Yes</Button>
            <Button className="mx-5" variant="danger" onClick={() => createRule(false)}>No</Button>
          </div>

        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </Container>

  );
}

import React, { useEffect } from 'react';
import {
  Container, Col, Row
} from 'react-bootstrap';

import { toast } from 'react-toastify';
import styles from './styles.module.css';
import {
  getActions, getAssets, getSODRules, postSODRules, deleteSODRules, geteachSODRules
} from '../../requests';

export function SODUpdate() {
  const [Assets, setAssets] = React.useState([]);
  const [Actions, setActions] = React.useState([]);
  const sodId = window.location.pathname.split('/')[3];
  const [exists, setExsists] = React.useState([]);

  async function updateSODRuleFunc(e) {
    const actionId = e.target.getAttribute('data-action');
    const assetId = e.target.getAttribute('data-asset');
    const actionName = e.target.getAttribute('data-actionName');
    const assetName = e.target.getAttribute('data-assetName');
    const query = `sodCode=${sodId}&actionId=${actionId}&assetId=${assetId}`;
    const resp = await getSODRules(query);

    if (resp.status === 200) {
      // Create the rule if such a rule doesn't exist
      if (resp.data.length === 0) {
        const response = await postSODRules(

          {
            action_id: actionId, asset_id: assetId, sod_code: sodId, sod_rule_name: actionName, sod_rule_description: `${actionName} ${assetName}`, sod_rule_permission: true
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
  }
  function findChecked(assetId, actionId) {
    const arr = exists.filter((o) => ((o.asset_id === assetId) && (o.action_id === actionId)));
    if (arr.length === 0) return false;
    return true;
  }
  useEffect(async () => {
    const resAsset = await getAssets();
    if (resAsset.status === 200) {
      setAssets(resAsset.data);
    }
    const resAction = await getActions();
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
          <h3>Edit SOD Rules</h3>
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
          <Row className="mb-5">
            <Col className={styles.sod}>{asset.asset_name}</Col>
            {Actions.map((action) => {
              const a = findChecked(asset.asset_id, action.action_id);
              return <Col><input data-action={action.action_id} checked={a ? 'checked' : ''} data-actionName={action.action_name} data-asset={asset.asset_id} data-assetName={asset.asset_name} key={action.action_id} onChange={(e) => updateSODRuleFunc(e)} type="checkbox" /></Col>;
            })}
          </Row>
        ))}

      </Container>
    </Container>

  );
}

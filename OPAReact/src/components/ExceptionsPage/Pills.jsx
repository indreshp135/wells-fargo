import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListGroup, Badge
} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function Pills({ exceptions, deleteException }) {
  const history = useHistory();
  const editPageRedirect = (id) => {
    history.push(`update/${id}`);
  };
  return (
    <div>
      { exceptions.map(({
        exception_rule_name: exceptionRuleName,
        exception_for_email: exceptionForEmail,
        exception_rule_id: exceptionRuleId
      }) => (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{exceptionRuleName}</div>
            {exceptionForEmail}
          </div>
          <Badge style={{ marginRight: '10px' }} bg="primary" pill>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { editPageRedirect(exceptionRuleId); }} size="lg" icon={faEdit} />
          </Badge>
          <Badge bg="danger" pill>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { deleteException(exceptionRuleId); }} size="lg" icon={faTrashAlt} />
          </Badge>
        </ListGroup.Item>
      ))}
    </div>
  );
}

Pills.propTypes = {
  exceptions: PropTypes.arrayOf(PropTypes.shape({
    exception_rule_name: PropTypes.string,
    exception_for_email: PropTypes.string,
    exception_rule_id: PropTypes.number
  })).isRequired,
  deleteException: PropTypes.func.isRequired
};

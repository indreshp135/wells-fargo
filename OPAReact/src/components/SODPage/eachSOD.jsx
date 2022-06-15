import React from 'react';
import {
  ListGroup, Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { deleteSOD } from '../../requests';

export function EachSOD({
  sodName, sodCode, location, updateDelete
}) {
  const history = useHistory();

  function editPageRedirect(id) {
    history.push(`/sod/update/${id.sodCode}`);
  }
  async function deleteSODfunc(id) {
    const resp = await deleteSOD(id);

    if (resp.status === 204) {
      toast.success('Deleted successfully');
      updateDelete();
    }
  }
  return (

    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{sodName}</div>
        {location}
      </div>
      <Badge style={{ marginRight: '10px' }} bg="primary" pill>
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { editPageRedirect({ sodCode }); }} size="lg" icon={faEdit} />
      </Badge>
      <Badge bg="danger" pill>
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { deleteSODfunc(sodCode); }} size="lg" icon={faTrashAlt} />
      </Badge>
    </ListGroup.Item>

  );
}

EachSOD.propTypes = {
  sodName: PropTypes.string.isRequired,
  sodCode: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  updateDelete: PropTypes.func.isRequired
};

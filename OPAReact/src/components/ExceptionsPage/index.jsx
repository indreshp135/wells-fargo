import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Container
} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Pills } from './Pills';
import { getExceptions, deleteExceptions } from '../../requests';

export function ExceptionsPage() {
  const { hash } = useParams();
  const [Exceptions, setExceptions] = React.useState([]);
  useEffect(async () => {
    const res = await getExceptions(hash);
    if (res.status === 200) {
      setExceptions(res.data);
    }
  }, []);
  const delException = async (exceptionId) => {
    const res = await deleteExceptions(exceptionId);
    if (res.status === 204) {
      setExceptions(Exceptions.filter((exception) => exception.exception_rule_id !== exceptionId));
      toast.success('Exception Deleted');
    } else {
      toast.error('Exception Delete Failed');
    }
  };

  const history = useHistory();
  return (
    <Container className="my-3">
      <div className="d-flex justify-content-end">
        <Button variant="outline-warning" onClick={() => history.push('add')}>
          <FontAwesomeIcon icon={faPlus} />
          Add Exception
        </Button>
      </div>
      <div>
        <h1 className="text-center">Exceptions</h1>
        <Pills hash={hash} exceptions={Exceptions} deleteException={delException} />
      </div>
    </Container>
  );
}

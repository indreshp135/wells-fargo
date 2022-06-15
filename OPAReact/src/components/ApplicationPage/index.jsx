import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faClone
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Container
} from 'react-bootstrap';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Boxes from './Boxes';

export function ApplicationPage() {
  const { hash } = useParams();
  return (
    <Container className="m-3">
      <div className="d-flex justify-content-end">
        <CopyToClipboard text={hash} onCopy={() => toast.success('Application Hash copied to Clipboard')}>
          <Button variant="success">
            {hash}
            {' '}
            <FontAwesomeIcon icon={faClone} />
          </Button>
        </CopyToClipboard>
      </div>
      <div className="text-center">
        <Boxes hash={hash} />
      </div>
    </Container>
  );
}

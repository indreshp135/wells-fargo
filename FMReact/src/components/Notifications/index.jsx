import React from 'react';
import {
  Container
} from 'react-bootstrap';
import { Pills } from './Pills';

export function NotificationsPage() {
  return (
    <Container className="my-3">
      <div>
        <h1 className="text-center">Notifications</h1>
        <Pills />
      </div>
    </Container>
  );
}

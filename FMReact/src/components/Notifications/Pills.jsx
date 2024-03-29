import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroup, Badge } from 'react-bootstrap';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  transferPermit,
  transferProceed,
  getNotifications,
  fileActionPermit,
  fileDeleteActionPermit
} from '../../requests';

export function Pills() {
  const [Notifications, setNotifications] = React.useState([]);
  useEffect(async () => {
    const res = await getNotifications();
    if (res.status === 200) {
      setNotifications(res.data);
    }
  }, []);
  const mark = async (id, type, status) => {
    const data = {
      notification_id: id,
      action_accepted: status
    };
    if (type === 'TRDM') {
      const res = await transferProceed(data);
      if (res.status === 200) {
        setNotifications(
          Notifications.filter(
            ({ notification_id: notificationId }) => notificationId !== id
          )
        );
        toast.success('Transfer Request Sent Successfully');
      } else {
        toast.error('Error Sending Transfer Request');
      }
    } else if (type === 'TRLM') {
      const res = await transferPermit(data);
      if (res.status === 200) {
        setNotifications(
          Notifications.filter(
            ({ notification_id: notificationId }) => notificationId !== id
          )
        );
        toast.success('Transfer Approved Sent Successfully');
      } else {
        toast.error('Error Sending Transfer Request');
      }
    } else if (type === 'WRLM') {
      const res = await fileActionPermit(data);
      if (res.status === 200) {
        setNotifications(
          Notifications.filter(
            ({ notification_id: notificationId }) => notificationId !== id
          )
        );
        toast.success('Successful');
      } else {
        toast.error('Error');
      }
    } else {
      const res = await fileDeleteActionPermit(data);
      if (res.status === 200) {
        setNotifications(
          Notifications.filter(
            ({ notification_id: notificationId }) => notificationId !== id
          )
        );
        toast.success('Successful');
      } else {
        toast.error('Error');
      }
    }
  };

  return (
    <div>
      { Notifications.map(({
        notification_id: notificationId,
        notification_message: notificationMessage,
        notification_type: notificationType
      }) => (
        <ListGroup.Item
          key={notificationId}
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div>{notificationMessage}</div>
          </div>
          <Badge style={{ marginRight: '10px' }} bg="primary" pill>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { mark(notificationId, notificationType, true); }} size="lg" icon={faCheck} />
          </Badge>
          <Badge bg="danger" pill>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { mark(notificationId, notificationType, false); }} size="lg" icon={faBan} />
          </Badge>
        </ListGroup.Item>
      ))}
    </div>
  );
}

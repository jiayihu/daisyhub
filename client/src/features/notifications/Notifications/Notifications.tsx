import './Notifications.scss';
import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getNotificationsSelector } from '../../../store/reducers';
import { removeNotification } from '../../../store/actions/notifications.actions';

export const Notifications = () => {
  const notifications = useSelector(getNotificationsSelector);
  const dispatch = useDispatch();

  return (
    <div className="notifications" aria-live="polite" aria-atomic="true">
      {notifications.map((notification, i) => (
        <Toast isOpen={true} key={i}>
          <ToastHeader
            icon={notification.type}
            toggle={() => dispatch(removeNotification(notification))}
          >
            <span className="mx-3">
              {notification.type === 'danger' ? 'ERROR' : notification.type.toUpperCase()}
            </span>
          </ToastHeader>
          <ToastBody>{notification.message}</ToastBody>
        </Toast>
      ))}
    </div>
  );
};

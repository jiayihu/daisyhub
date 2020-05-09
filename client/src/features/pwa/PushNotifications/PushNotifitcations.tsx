import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { urlBase64ToUint8Array } from '../../../utilities/utils';
import {
  createPushSubscription,
  deletePushSubscription,
} from '../../../services/push-notifications.service';

function subscribeToPush() {
  return navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) return;

    const vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY as string;

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  });
}

function getSubscription() {
  return navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) return;

    return registration.pushManager.getSubscription();
  });
}

function requestNotifications() {
  return Notification.requestPermission().then(permission => {
    if (permission !== 'granted') return;

    return permission;
  });
}

type Props = {
  bulletinId: string;
};

export const PushNotifications = (props: Props) => {
  const { bulletinId } = props;
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEnable = useCallback(() => {
    requestNotifications()
      .then(() => subscribeToPush())
      .then(subscription => {
        if (subscription) {
          setIsSubscribed(true);
          createPushSubscription(bulletinId, subscription);
        }
      });
  }, [bulletinId]);
  const handleDisable = useCallback(() => {
    getSubscription().then(subscription => {
      if (subscription) {
        const authKey = subscription.toJSON().keys?.auth as string;
        subscription.unsubscribe().then(() => {
          setIsSubscribed(false);
          deletePushSubscription(bulletinId, authKey);
        });
      }
    });
  }, [bulletinId]);

  useEffect(() => {
    getSubscription().then(subscription => {
      setIsSubscribed(Boolean(subscription));

      if (subscription) createPushSubscription(bulletinId, subscription);
    });
  }, [bulletinId, setIsSubscribed]);

  if (!PushNotifications.isSupported()) return null;

  return isSubscribed ? (
    <Button color="dark" size="sm" onClick={handleDisable}>
      Disable notifications
    </Button>
  ) : (
    <Button color="dark" size="sm" onClick={handleEnable}>
      Enable notifications
    </Button>
  );
};

PushNotifications.isSupported = function () {
  return 'serviceWorker' in navigator && 'Notification' in window;
};

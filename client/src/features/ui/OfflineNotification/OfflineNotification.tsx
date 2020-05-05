import React, { useState, useCallback } from 'react';
import { Alert } from 'reactstrap';
import { useEventListener } from '../../../hooks/useEventListener';

export const OfflineNotification = () => {
  const [isOffline, setIsOffline] = useState(false);

  const offlineHandler = useCallback(() => setIsOffline(true), []);
  const onlineHandler = useCallback(() => setIsOffline(false), []);
  useEventListener(window, 'offline', offlineHandler);
  useEventListener(window, 'online', onlineHandler);

  if (!isOffline) return null;

  return (
    <Alert color="dark">
      <strong>You are offline.</strong> It seems there is a problem with your connection.
    </Alert>
  );
};

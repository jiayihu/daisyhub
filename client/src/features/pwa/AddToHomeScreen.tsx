import React, { useRef, useCallback, useState } from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import { useSelector } from 'react-redux';
import { selectBulletinVisitorId, selectBulletinOwnerId } from '../../store/reducers';
import { Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { ToastContainer } from '../notifications/ToastContainer/ToastContainer';

export const AddToHomeScreen = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const visitorId = useSelector(selectBulletinVisitorId);
  const ownerId = useSelector(selectBulletinOwnerId);

  const promptEventRef = useRef<BeforeInstallPromptEvent>();
  const promptHandler = useCallback(
    (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      promptEventRef.current = event;
      console.log('Install prompt event saved for later');
      setIsInstallable(true);
    },
    [promptEventRef, setIsInstallable],
  );
  useEventListener(window, 'beforeinstallprompt', promptHandler);

  const handleCancel = useCallback(() => setIsInstallable(false), [setIsInstallable]);
  const handleConfirm = useCallback(() => {
    setIsInstallable(false);

    if (promptEventRef.current) {
      promptEventRef.current.prompt();
      promptEventRef.current.userChoice.then(result => {
        if (result.outcome === 'accepted') {
          console.log('User installed the application');
        } else {
          console.log('User dismissed the install prompt');
        }

        promptEventRef.current = undefined;
      });
    }
  }, [setIsInstallable]);

  if (!isInstallable) return null;

  const isOpen = isInstallable && Boolean(visitorId || ownerId);
  const message = visitorId ? "Such as when it's your turn in the queue." : ownerId ? '' : '';

  return (
    <ToastContainer>
      <Toast isOpen={isOpen}>
        <ToastHeader icon="info" toggle={handleCancel}>
          <span className="mx-3">Add to the Home screen</span>
        </ToastHeader>
        <ToastBody>
          <p>
            You can add the application to your Home screen to open it quickly the next time. We're
            sending you as few notifications as possible. {message}
          </p>
          <p>
            <Button type="button" color="light" onClick={handleCancel}>
              Cancel
            </Button>{' '}
            <Button type="button" color="success" onClick={handleConfirm}>
              Confirm
            </Button>
          </p>
        </ToastBody>
      </Toast>
    </ToastContainer>
  );
};

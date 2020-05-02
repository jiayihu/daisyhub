import React from 'react';
import { Message } from '../../../types/message';
import { Alert } from 'reactstrap';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  isOwner: boolean;
  message: Message;
};

export const SimpleMessage = (props: Props) => {
  const { isOwner, message } = props;
  const date = formatDistanceToNow(new Date(message.creationDate), { addSuffix: true });

  return (
    <Alert color={isOwner ? 'secondary' : 'light'}>
      <div>
        <strong>{message.name}</strong> (<span>{date}</span>): <span>{message.message}</span>
      </div>
    </Alert>
  );
};

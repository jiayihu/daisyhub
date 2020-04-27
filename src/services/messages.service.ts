import { readMessages, createMessage, MessageBody, deleteMessage } from '../models/messages.model';

export function getMessages(bulletinId: string) {
  return readMessages(bulletinId);
}

export function addMessage(bulletinId: string, body: MessageBody) {
  return createMessage(bulletinId, body);
}

export function removeMessage(bulletinId: string, messageId: string) {
  return deleteMessage(bulletinId, messageId);
}

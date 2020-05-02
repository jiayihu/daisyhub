import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

export const ConfirmModal = (props: Props) => {
  const { isOpen, onConfirm, onCancel } = props;

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onCancel}>Confirm</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button type="button" color="light" onClick={onCancel}>
          Cancel
        </Button>{' '}
        <Button type="button" color="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

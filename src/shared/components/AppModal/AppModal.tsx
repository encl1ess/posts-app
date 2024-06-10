import { FC, ReactNode } from 'react';
import { Header } from '../Header/Header';
import Modal from 'react-bootstrap/Modal';

interface AppModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const AppModal: FC<AppModalProps> = ({
  children,
  isVisible,
  onClose,
}) => {
  return (
    <Modal show={isVisible} onHide={onClose} centered>
      {children}
    </Modal>
  );
};

import { FC, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AppModal } from '../../shared/components/AppModal/AppModal';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { commentsActionsAsync } from '../model/commentsReducer';

interface DeleteCommentProps {
  id: number;
}

export const DeleteComment: FC<DeleteCommentProps> = ({ id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => setIsVisible(false);
  const handleShow = () => setIsVisible(true);

  const handleDelete = () => {
    dispatch(commentsActionsAsync.deleteComment(id));
    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className="w-100 btn text-start">
        Delete
      </button>
      <AppModal isVisible={isVisible} onClose={handleClose}>
        <Modal.Body className="fw-bold">
          Are you sure that you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </AppModal>
    </>
  );
};

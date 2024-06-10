import { FC, ReactNode, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AppModal } from '../../shared/components/AppModal/AppModal';
import { Comment } from '../model/types';
import { AddCommentForm } from './AddCommentForm';

interface EditCommentProps {
  comment: Comment;
}

export const EditComment: FC<EditCommentProps> = ({ comment }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => setIsVisible(false);
  const handleShow = () => setIsVisible(true);

  return (
    <>
      <button onClick={handleShow} className="w-100 btn text-start">
        Edit
      </button>
      <AppModal isVisible={isVisible} onClose={handleClose}>
        <Modal.Body>
          <Modal.Title>Edit comment</Modal.Title>
          <AddCommentForm
            data={comment}
            postId={comment.postId}
            onSubmit={handleClose}
          />
        </Modal.Body>
      </AppModal>
    </>
  );
};

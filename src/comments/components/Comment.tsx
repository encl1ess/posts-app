import { Comment as CommentType } from '../model/types';
import { Card, DropdownButton, DropdownItem } from 'react-bootstrap';
import { DeleteComment } from './DeleteComment';
import { EditComment } from './EditComment';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../utils/constants';

interface CommentProps {
  comment: CommentType;
  isViewPostVisible?: boolean;
}

export const Comment = ({ comment, isViewPostVisible }: CommentProps) => {
  return (
    <Card style={{ maxWidth: '800px' }}>
      <DropdownButton
        title=""
        className="position-absolute top-0 end-0"
        children={
          <>
            <DropdownItem>
              <EditComment comment={comment} />
            </DropdownItem>
            <DropdownItem>
              <DeleteComment id={comment.id} />
            </DropdownItem>
          </>
        }
      />
      <Card.Body className="d-flex flex-column gap-2">
        <Card.Title className="text-capitalize mw-80">
          {comment.name}
        </Card.Title>
        <Card.Subtitle className="fw-italic">{comment.email}</Card.Subtitle>
        <Card.Text>{comment.body}</Card.Text>
        {isViewPostVisible && (
          <Link to={`${ROUTE.POSTS}/${comment.postId}`} className="ms-auto">
            View Post
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

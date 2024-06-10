import { Post as PostType } from '../model/types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../utils/constants';

interface PostProps {
  post: PostType;
  isReadMoreVisible?: boolean;
  className?: string;
}

export const Post = ({ post, isReadMoreVisible, className }: PostProps) => {
  return (
    <Card
      style={{ maxWidth: '600px', minWidth: '200px', height: 'fit-content' }}
      className={className}
    >
      <Card.Header>
        <Card.Title className="text-uppercase">{post.title}</Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column align-items-center gap-2">
        <Card.Text>{post.body}</Card.Text>
        {isReadMoreVisible && (
          <Link to={`${ROUTE.POSTS}/${post.id}`} className="ms-auto">
            Read More
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

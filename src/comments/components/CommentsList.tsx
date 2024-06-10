import { Comment } from './Comment';
import { Stack } from 'react-bootstrap';
import { Comment as CommentType } from '../model/types';

interface CommentsListProps {
  comments: CommentType[];
  className?: string;
  isViewPostVisible?: boolean;
}

export const CommentsList = ({
  comments,
  className,
  isViewPostVisible,
}: CommentsListProps) => {
  return (
    <Stack gap={2} className={className}>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          isViewPostVisible={isViewPostVisible}
        />
      ))}
    </Stack>
  );
};

import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getPostById } from '../../posts/api';
import { Post } from '../../posts/components/Post';
import { Post as PostType } from '../../posts/model/types';
import { useParams } from 'react-router-dom';
import {
  commentsActionsAsync,
  selectComments,
  selectIsCommentsLoading,
} from '../../comments/model/commentsReducer';
import { CommentsList } from '../../comments/components/CommentsList';
import { AddCommentForm } from '../../comments/components/AddCommentForm';
import { Spinner } from 'react-bootstrap';

export const PostPage = () => {
  const id = useParams().id;
  const [post, setPost] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isCommentsLoading = useSelector(selectIsCommentsLoading);
  const comments = useSelector(selectComments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getPostById(Number(id)).then((data) => {
        setPost(data);
        setIsLoading(false);
      });

      dispatch(commentsActionsAsync.getPostComments(Number(id)));
    }
  }, []);

  return (
    <div className="d-flex row-gap-5 column-gap-5 mh-100 h-100 flex-column flex-md-row">
      {isLoading || isCommentsLoading ? (
        <Spinner className="m-auto" />
      ) : (
        <>
          {post && (
            <div className="d-flex row-gap-5 flex-column">
              <Post post={post} />
              <AddCommentForm postId={post.id} />
            </div>
          )}
          <div style={{ minWidth: '200px' }}>
            <CommentsList
              comments={comments}
              className="mh-100 pe-2 pb-2 overflow-auto"
            />
          </div>
        </>
      )}
    </div>
  );
};

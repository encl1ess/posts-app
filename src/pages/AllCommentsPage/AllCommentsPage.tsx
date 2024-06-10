import { useEffect } from 'react';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Paginator } from '../../shared/components/Paginator/Paginator';
import { CommentsList } from '../../comments/components/CommentsList';
import {
  commentsActions,
  commentsActionsAsync,
  selectCommentsMaxPage,
  selectCommentsPage,
  selectCommentsPaginated,
  selectIsCommentsLoading,
} from '../../comments/model/commentsReducer';

export const AllCommentsPage = () => {
  const isLoading = useSelector(selectIsCommentsLoading);
  const commentsPaginated = useSelector(selectCommentsPaginated);
  const page = useSelector(selectCommentsPage);
  const maxPage = useSelector(selectCommentsMaxPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(commentsActionsAsync.getAllComments());
  }, []);

  const handlePaginatorClick = (page: number) => {
    dispatch(commentsActions.setPage(page));
  };

  return (
    <div className="d-flex flex-column row-gap-3" style={{ minHeight: '100%' }}>
      {isLoading ? (
        <Spinner className="m-auto" />
      ) : (
        <>
          <CommentsList
            comments={commentsPaginated}
            className="mx-auto"
            isViewPostVisible
          />
          <Paginator
            className="ms-auto"
            currentPage={page}
            maxPage={maxPage}
            onClick={handlePaginatorClick}
          />
        </>
      )}
    </div>
  );
};

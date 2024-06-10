import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { PostsList } from '../../posts/components/PostsList';
import { Paginator } from '../../shared/components/Paginator/Paginator';
import {
  postsActions,
  postsActionsAsync,
  selectIsPostsLoading,
  selectPostsMaxPage,
  selectPostsPage,
  selectPostsPaginated,
} from '../../posts/model/postsReducer';

export const AllPostsPage = () => {
  const isLoading = useSelector(selectIsPostsLoading);
  const postsPaginated = useSelector(selectPostsPaginated);
  const page = useSelector(selectPostsPage);
  const maxPage = useSelector(selectPostsMaxPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsActionsAsync.getAllPosts());
  }, []);

  const handlePaginatorClick = (page: number) => {
    dispatch(postsActions.setPage(page));
  };

  return (
    <div className="d-flex flex-column row-gap-3" style={{ minHeight: '100%' }}>
      {isLoading ? (
        <Spinner className="m-auto" />
      ) : (
        <>
          <PostsList posts={postsPaginated} className="mx-auto" />
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

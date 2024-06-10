import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { PostsList } from '../../posts/components/PostsList';
import { Paginator } from '../../shared/components/Paginator/Paginator';
import { getAllPosts } from '../../posts/api';
import {
  postsActions,
  selectPostsMaxPage,
  selectPostsPage,
  selectPostsPaginated,
} from '../../posts/model/postsReducer';

export const AllPostsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postsPaginated = useSelector(selectPostsPaginated);
  const page = useSelector(selectPostsPage);
  const maxPage = useSelector(selectPostsMaxPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getAllPosts().then((data) => {
      dispatch(postsActions.setPosts(data));
      setIsLoading(false);
    });
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
          <PostsList posts={postsPaginated} />
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

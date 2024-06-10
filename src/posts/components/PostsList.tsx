import { Post } from './Post';
import { Stack } from 'react-bootstrap';
import { Post as PostType } from '../model/types';

interface PostsListProps {
  posts: PostType[];
  className?: string;
}

export const PostsList = ({ posts, className }: PostsListProps) => {
  return (
    <Stack gap={3} className={className}>
      {posts.map((post) => (
        <Post post={post} key={post.id} isReadMoreVisible />
      ))}
    </Stack>
  );
};

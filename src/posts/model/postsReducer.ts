import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from './types';

interface PostsState {
  posts: Post[];
  page: number;
  offset: number;
}

const initialState: PostsState = {
  posts: [],
  page: 1,
  offset: 10,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

export const postsActions = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsPage = (state: RootState) => state.posts.page;
export const selectPostsMaxPage = (state: RootState) =>
  Math.ceil(state.posts.posts.length / state.posts.offset);
export const selectPostsPaginated = (state: RootState) =>
  state.posts.posts.slice(
    (state.posts.page - 1) * state.posts.offset,
    state.posts.page * state.posts.offset,
  );

export default postsSlice.reducer;

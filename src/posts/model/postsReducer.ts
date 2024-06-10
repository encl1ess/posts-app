import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Post } from './types';
import { createAppAsyncThunk } from '../../utils/hooks/useAppDispatch';
import { getAllPostsRequest } from '../api';
import {
  getMaxPage,
  getPaginatedData,
} from '../../utils/helpers/getPaginatedData';

interface PostsState {
  posts: Post[];
  page: number;
  offset: number;
  isLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  page: 1,
  offset: 10,
  isLoading: false,
};

const getAllPosts = createAppAsyncThunk('posts/getAllPosts', async () => {
  const response = await getAllPostsRequest();
  return response;
});

export const postsSlice = createSlice({
  name: 'posts',
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = false;
    });
  },
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
export const postsActionsAsync = { getAllPosts };

export const selectIsPostsLoading = (state: RootState) => state.posts.isLoading;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsPage = (state: RootState) => state.posts.page;
export const selectPostsMaxPage = (state: RootState) =>
  getMaxPage(state.posts.posts.length, state.posts.offset);
export const selectPostsPaginated = (state: RootState) =>
  getPaginatedData<Post>(
    state.posts.posts,
    state.posts.page,
    state.posts.offset,
  );

export default postsSlice.reducer;

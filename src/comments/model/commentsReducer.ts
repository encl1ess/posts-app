import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { createAppAsyncThunk } from '../../utils/hooks/useAppDispatch';
import {
  addCommentRequest,
  deleteCommentRequest,
  getAllCommentsRequest,
  getPostCommentsRequest,
  updateCommentRequest,
} from '../api';
import { Comment, CommentBody } from './types';
import {
  getMaxPage,
  getPaginatedData,
} from '../../utils/helpers/getPaginatedData';

interface CommentsState {
  comments: Comment[];
  page: number;
  offset: number;
  isLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  page: 1,
  offset: 10,
  isLoading: false,
};

const getAllComments = createAppAsyncThunk(
  'comments/getAllComments',
  async () => {
    const response = await getAllCommentsRequest();
    return response;
  },
);

const getPostComments = createAppAsyncThunk(
  'comments/getPostComments',
  async (id: number) => {
    const response = await getPostCommentsRequest(id);
    return response;
  },
);

const addComment = createAppAsyncThunk(
  'comments/addComment',
  async (body: CommentBody) => {
    const response = await addCommentRequest(body);
    return response;
  },
);

const updateComment = createAppAsyncThunk(
  'comments/updateComment',
  async ({ id, body }: { id: number; body: CommentBody }) => {
    const response = await updateCommentRequest(id, body);
    return { ...response, id };
  },
);

const deleteComment = createAppAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await deleteCommentRequest(id);
    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getAllComments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPostComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getPostComments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments = [action.payload, ...state.comments];
        state.isLoading = false;
      },
    );
    builder.addCase(
      updateComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id,
        );
        state.comments[index] = action.payload;
      },
    );
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload,
        );
      },
    );
  },
  reducers: {
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsActionsAsync = {
  getAllComments,
  getPostComments,
  addComment,
  updateComment,
  deleteComment,
};

export const selectComments = (state: RootState) => state.comments.comments;
export const selectIsCommentsLoading = (state: RootState) =>
  state.comments.isLoading;
export const selectCommentsPage = (state: RootState) => state.comments.page;
export const selectCommentsMaxPage = (state: RootState) =>
  getMaxPage(state.comments.comments.length, state.comments.offset);
export const selectCommentsPaginated = (state: RootState) =>
  getPaginatedData<Comment>(
    state.comments.comments,
    state.comments.page,
    state.comments.offset,
  );

export default commentsSlice.reducer;

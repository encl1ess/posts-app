import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { createAppAsyncThunk } from '../../utils/hooks/useAppDispatch';
import {
  addCommentRequest,
  deleteCommentRequest,
  getCommentsRequest,
  updateCommentRequest,
} from '../api';
import { Comment, CommentBody } from './types';

interface CommentsState {
  comments: Comment[];
  page: number;
  offset: number;
  isLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  page: 1,
  offset: 5,
  isLoading: false,
};

const getComments = createAppAsyncThunk(
  'comments/getComments',
  async (id: number) => {
    const response = await getCommentsRequest(id);
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
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
      },
    );
    builder.addCase(getComments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments = [action.payload, ...state.comments];
      },
    );
    builder.addCase(addComment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex(
          (comment) => comment.id === action.payload.id,
        );
        state.comments[index] = action.payload;
      },
    );
    builder.addCase(updateComment.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload,
        );
      },
    );
    builder.addCase(deleteComment.rejected, (state) => {
      state.isLoading = false;
    });
  },
  reducers: {},
});

export const commentsActions = commentsSlice.actions;
export const commentsActionsAsync = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;

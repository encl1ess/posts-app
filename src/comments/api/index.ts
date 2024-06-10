import { API_ROUTES, API_URL } from '../../utils/constants';
import { Comment, CommentBody } from '../model/types';

export const getAllCommentsRequest = async (): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}${API_ROUTES.COMMENTS}`);
  return await response.json();
};

export const getPostCommentsRequest = async (
  id: number,
): Promise<Comment[]> => {
  const response = await fetch(
    `${API_URL}${API_ROUTES.POSTS}/${id}/${API_ROUTES.COMMENTS}`,
  );
  return await response.json();
};

export const addCommentRequest = async (
  body: CommentBody,
): Promise<Comment> => {
  const response = await fetch(
    `${API_URL}${API_ROUTES.POSTS}/${body.postId}/${API_ROUTES.COMMENTS}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return await response.json();
};

export const updateCommentRequest = async (
  id: number,
  body: CommentBody,
): Promise<Comment> => {
  const response = await fetch(`${API_URL}${API_ROUTES.COMMENTS}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const deleteCommentRequest = async (id: number) => {
  const response = await fetch(`${API_URL}${API_ROUTES.COMMENTS}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};

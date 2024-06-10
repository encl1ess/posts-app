import { API_ROUTES, API_URL } from '../../utils/constants';
import { Post } from '../model/types';

export const getAllPostsRequest = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}${API_ROUTES.POSTS}`);
  return await response.json();
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_URL}${API_ROUTES.POSTS}/${id}`);
  return await response.json();
};

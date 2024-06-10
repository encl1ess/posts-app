import { API_ROUTES, API_URL } from '../../utils/constants';
import { Post } from '../model/types';

export const getAllPosts = (): Promise<Post[]> => {
  return fetch(`${API_URL}${API_ROUTES.POSTS}`).then((response) =>
    response.json(),
  );
};

export const getPostById = (id: number): Promise<Post> => {
  return fetch(`${API_URL}${API_ROUTES.POSTS}/${id}`).then((response) =>
    response.json(),
  );
};

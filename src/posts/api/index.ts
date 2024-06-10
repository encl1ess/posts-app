import { API_ROUTES, API_URL } from '../../utils/constants';

export const getAllPosts = () => {
  return fetch(`${API_URL}${API_ROUTES.POSTS}`).then((response) =>
    response.json(),
  );
};

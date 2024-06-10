export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export type CommentBody = {
  postId: number;
  name: string;
  email: string;
  body: string;
};

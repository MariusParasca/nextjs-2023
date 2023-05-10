export type ToDo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  balance: number;
  customProp?: string;
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export type ApiError =
  | {
      error: boolean;
      message: string;
    }
  | string;

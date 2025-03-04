export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostInput {
  title: string;
  body: string;
  user_id: number;
} 
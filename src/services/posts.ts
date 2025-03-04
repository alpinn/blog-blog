import { AxiosError } from 'axios';
import { apiClient } from '@/lib/api-client';
import { Post, PostInput } from '@/types/post';
import { API_CONFIG } from '@/config/api';

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

export const getPosts = async (page: number = 1, per_page: number = 10): Promise<PostsResponse> => {
  try {
    const response = await apiClient.get<Post[]>('/users/' + API_CONFIG.DEFAULT_USER_ID + '/posts', {
      params: {
        page,
        per_page,
      },
    });

    // GoRest API returns total in headers
    const total = parseInt(response.headers['x-pagination-total'] || '0');
    const currentPage = parseInt(response.headers['x-pagination-page'] || '1');

    return {
      data: response.data,
      total,
      page: currentPage,
      limit: per_page,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createPost = async (post: PostInput): Promise<Post> => {
  try {
    const response = await apiClient.post<Post>('/posts', {
      ...post,
      user_id: API_CONFIG.DEFAULT_USER_ID,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error creating post:', axiosError.response?.data || axiosError);
    throw error;
  }
};

export const updatePost = async (id: number, post: Partial<PostInput>): Promise<Post> => {
  try {
    const response = await apiClient.put<Post>(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}; 
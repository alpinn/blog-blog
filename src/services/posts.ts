import { AxiosError } from 'axios';
import { apiClient } from '@/lib/api-client';
import { Post, PostInput } from '@/types/post';
import { API_CONFIG } from '@/config/api';

const postCache = new Map<string, { data: Post[]; total: number; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (page: number, per_page: number, search: string) => 
  `${page}-${per_page}-${search}`;

const isValidCache = (timestamp: number) => 
  Date.now() - timestamp < CACHE_DURATION;

const invalidateCache = () => {
  postCache.clear();
};

export interface PostsResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface GetPostsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export const getPosts = async ({ page = 1, per_page = 10, search = '' }: GetPostsParams = {}): Promise<PostsResponse> => {
  try {
    const cacheKey = getCacheKey(page, per_page, search);
    const cachedData = postCache.get(cacheKey);

    if (cachedData && isValidCache(cachedData.timestamp)) {
      return {
        data: cachedData.data,
        total: cachedData.total,
        page,
        limit: per_page,
      };
    }

    const isIdSearch = !isNaN(Number(search)) && search !== '';
    
    const response = await apiClient.get<Post[]>('/users/' + API_CONFIG.DEFAULT_USER_ID + '/posts', {
      params: {
        page,
        per_page,
        ...(isIdSearch ? { id: Number(search) } : search ? { title: `%${search}%` } : {}),
      },
    });

    const total = parseInt(response.headers['x-pagination-total'] || '0');
    const currentPage = parseInt(response.headers['x-pagination-page'] || '1');

    postCache.set(cacheKey, {
      data: response.data,
      total,
      timestamp: Date.now(),
    });

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
    invalidateCache();
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
    invalidateCache();
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/posts/${id}`);
    invalidateCache();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}; 
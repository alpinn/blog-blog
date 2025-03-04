import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { Post, PostInput } from '@/types/post';
import * as postsService from '@/services/posts';

export function usePosts() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', page, pageSize, searchQuery],
    queryFn: () => postsService.getPosts({ page, per_page: pageSize, search: searchQuery }),
  });

  const createMutation = useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post created successfully');
    },
    onError: () => {
      message.error('Failed to create post');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<PostInput> }) =>
      postsService.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post updated successfully');
    },
    onError: () => {
      message.error('Failed to update post');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post deleted successfully');
    },
    onError: () => {
      message.error('Failed to delete post');
    },
  });

  const handlePageChange = (newPage: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPage(1);
    } else {
      setPage(newPage);
    }
    setPageSize(newPageSize);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page when searching
  };

  return {
    page,
    pageSize,
    searchQuery,
    setPage,
    setPageSize,
    handlePageChange,
    handleSearch,
    postsData,
    isLoading,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  };
} 
import { useState, useMemo } from 'react';
import { Table, Button, Modal, Popconfirm, Space, Typography, Pagination, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AppLayout from '@/components/layout/AppLayout';
import PostForm from '@/components/posts/PostForm';
import SearchBar from '@/components/posts/SearchBar';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types/post';
import SEO from '@/components/common/SEO';

const { Paragraph } = Typography;

export default function PostsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    page, 
    pageSize,
    handlePageChange,
    postsData, 
    isLoading, 
    createPost, 
    updatePost, 
    deletePost,
    handleSearch,
  } = usePosts();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const columns: ColumnsType<Post> = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'center',
      render: (id) => (
        <span className="text-gray-500">{id}</span>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text) => (
        <Tooltip title="Click preview to see full content">
          <div className="font-medium">
            {text.length > 50 ? `${text.slice(0, 50)}...` : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'body',
      key: 'body',
      width: '35%',
      render: (text) => (
        <Tooltip title="Click preview to see full content">
          <div className="text-gray-600">
            {text.length > 100 ? `${text.slice(0, 100)}...` : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '25%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="flex justify-center w-full">
          <Tooltip title="Preview post">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => {
                setPreviewPost(record);
                setIsPreviewOpen(true);
              }}
              className="text-green-500 hover:text-green-600 flex items-center justify-center"
            />
          </Tooltip>
          <Tooltip title="Edit post">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingPost(record);
                setIsModalOpen(true);
              }}
              className="text-blue-500 hover:text-blue-600 flex items-center justify-center"
            />
          </Tooltip>
          <Popconfirm
            title="Delete post"
            description="Are you sure you want to delete this post?"
            onConfirm={() => deletePost(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete post">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-500 hover:text-red-600 flex items-center justify-center"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ], []);

  const tableProps = useMemo(() => ({
    columns,
    dataSource: postsData?.data,
    rowKey: "id",
    loading: isLoading,
    pagination: false as const,
    className: "[&_.ant-table-container]:!border-b-0 [&_.ant-table-cell]:!px-4",
    scroll: { x: 800 },
    style: { minWidth: '800px' }
  }), [columns, postsData?.data, isLoading]);

  return (
    <>
      <SEO 
        title="Blog Posts"
        description="Manage and view all blog posts"
      />
      <AppLayout>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold m-0">Blog Posts</h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-auto order-2 sm:order-1">
                <SearchBar
                  onSearch={(value) => {
                    setSearchQuery(value);
                    handleSearch(value);
                  }}
                />
              </div>
              
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingPost(null);
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                Create Post
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg flex flex-col">
            <div className="overflow-x-auto rounded-lg shadow-sm">
              <Table {...tableProps} />
            </div>
            <div className="py-4 px-6 border-t border-gray-200">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={postsData?.total}
                onChange={handlePageChange}
                showSizeChanger={true}
                pageSizeOptions={[10, 20, 50]}
                className="flex justify-center"
              />
            </div>
          </div>

          <Modal
            title={editingPost ? 'Edit Post' : 'Create Post'}
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            width={600}
            maskClosable={false}
            destroyOnClose
          >
            <PostForm
              initialValues={editingPost || undefined}
              onSubmit={(values) => {
                if (editingPost) {
                  updatePost({ id: editingPost.id, post: values });
                } else {
                  createPost({ ...values, user_id: 1 });
                }
                handleModalClose();
              }}
              onCancel={handleModalClose}
              isEdit={!!editingPost}
            />
          </Modal>

          <Modal
            title="Preview Post"
            open={isPreviewOpen}
            onCancel={() => setIsPreviewOpen(false)}
            footer={null}
            width={600}
          >
            {previewPost && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">{previewPost.title}</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{previewPost.body}</p>
              </div>
            )}
          </Modal>
        </div>
      </AppLayout>
    </>
  );
} 
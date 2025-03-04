import { useState } from 'react';
import { Table, Button, Modal, Popconfirm, Space, Typography, Pagination, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AppLayout from '@/components/layout/AppLayout';
import PostForm from '@/components/posts/PostForm';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types/post';
import SEO from '@/components/common/SEO';

const { Paragraph } = Typography;

export default function PostsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { 
    page, 
    pageSize,
    handlePageChange,
    postsData, 
    isLoading, 
    createPost, 
    updatePost, 
    deletePost 
  } = usePosts();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const columns: ColumnsType<Post> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      align: 'center',
      render: (id) => (
        <span className="text-gray-500">{id}</span>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: '35%',
      render: (text) => (
        <Paragraph
          ellipsis={{ rows: 2, tooltip: text }}
          className="mb-0 font-medium"
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'body',
      key: 'body',
      ellipsis: true,
      width: '40%',
      render: (text) => (
        <Paragraph
          ellipsis={{ rows: 3, tooltip: text }}
          className="mb-0 text-gray-600"
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="flex justify-center w-full">
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
  ];

  return (
    <>
      <SEO 
        title="Blog Posts"
        description="Manage and view all blog posts"
      />
      <AppLayout>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold m-0">Blog Posts</h1>
            <Button
              type="primary"
              onClick={() => {
                setEditingPost(null);
                setIsModalOpen(true);
              }}
            >
              Create Post
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg flex flex-col">
            <div className="overflow-x-auto">
              <div className="min-w-[600px] w-full">
                <Table
                  columns={columns}
                  dataSource={postsData?.data}
                  rowKey="id"
                  loading={isLoading}
                  pagination={false}
                  className="[&_.ant-table-container]:!border-b-0 [&_.ant-table-cell]:!px-4"
                  scroll={{ x: 600 }}
                />
              </div>
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
        </div>
      </AppLayout>
    </>
  );
} 
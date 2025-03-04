import { Form, Input, Button, Space } from 'antd';
import { Post, PostInput } from '@/types/post';

interface PostFormProps {
  initialValues?: Post;
  onSubmit: (values: PostInput) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function PostForm({ initialValues, onSubmit, onCancel, isEdit }: PostFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
      className="mt-4"
      requiredMark={true}
    >
      <Form.Item
        name="title"
        label={<span className="font-medium">Title</span>}
        rules={[
          { required: true, message: 'Please enter a title' },
          { max: 100, message: 'Title cannot be longer than 100 characters' },
          { whitespace: true, message: 'Title cannot be empty' }
        ]}
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 2 }}
          placeholder="Enter post title"
          className="text-base"
        />
      </Form.Item>

      <Form.Item
        name="body"
        label={<span className="font-medium">Content</span>}
        rules={[
          { required: true, message: 'Please enter content' },
          { max: 1000, message: 'Content cannot be longer than 1000 characters' },
          { whitespace: true, message: 'Content cannot be empty' }
        ]}
      >
        <Input.TextArea
          rows={6}
          placeholder="Write your post content here..."
          showCount
          maxLength={1000}
          className="text-base"
        />
      </Form.Item>

      <Form.Item className="mb-0 flex justify-end">
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? 'Update Post' : 'Create Post'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 
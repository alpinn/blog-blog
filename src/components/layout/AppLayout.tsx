import { Layout, Menu, theme, Button, Drawer } from 'antd';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      label: <Link href="/">Home</Link>,
    },
    {
      key: '/posts',
      label: <Link href="/posts">Blog Posts</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center px-4 sm:px-6 lg:px-16 sticky top-0 z-10 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="text-white text-xl font-bold shrink-0">
            Blog Blog
          </div>
          
          <div className="hidden md:flex flex-1 justify-center">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[router.pathname]}
              items={menuItems}
              className="min-w-[200px] flex justify-center"
              style={{ background: 'transparent', border: 'none' }}
            />
          </div>

          <div className="w-[100px] hidden md:block" />

          <Button
            type="text"
            icon={<MenuOutlined style={{ color: 'white' }} />}
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden"
          />
        </div>

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          className="md:hidden"
        >
          <Menu
            mode="vertical"
            selectedKeys={[router.pathname]}
            items={menuItems}
            onClick={() => setMobileMenuOpen(false)}
          />
        </Drawer>
      </Header>

      <Content className="p-4 sm:p-6 lg:p-8">
        <div
          className="p-4 sm:p-6 lg:p-8 rounded-lg"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: '80vh',
          }}
        >
          {children}
        </div>
      </Content>

      <Footer className="text-center py-4 px-4">
        <p className="text-sm text-gray-600">
        Blog Blog ©{new Date().getFullYear()}
        </p>
      </Footer>
    </Layout>
  );
} 
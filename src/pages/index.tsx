import { useQuery } from '@tanstack/react-query';
import { Card, Button } from 'antd';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import Loading from '@/components/common/Loading';
import SEO from '@/components/common/SEO';
import { getPosts } from '@/services/posts';

export default function HomePage() {
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', 1],
    queryFn: () => getPosts({ page: 1 }),
  });

  return (
    <>
      <SEO 
        title="Home"
        description="Discover interesting articles and share your thoughts with our community."
      />
      <AppLayout>
        <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to Blog Blog
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover interesting articles and share your thoughts with our community.
            </p>
            <Link href="/posts">
              <Button type="primary" size="large" className="mt-4 sm:mt-8">
                View All Posts
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Recent Posts</h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full">
                  <Loading />
                </div>
              ) : (
                postsData?.data.slice(0, 3).map((post) => (
                  <Card
                    key={post.id}
                    title={
                      <div className="text-lg font-medium line-clamp-1">
                        {post.title}
                      </div>
                    }
                    className="h-[200px] hover:shadow-lg transition-shadow"
                    bodyStyle={{ height: '132px', overflow: 'hidden' }}
                  >
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.body}
                    </p>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}

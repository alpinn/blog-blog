import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export default function SEO({
  title,
  description = 'A modern blog platform built with Next.js and Ant Design.',
  keywords = ['blog', 'nextjs', 'antd'],
  ogImage = '/og-image.jpg',
}: SEOProps) {
  const siteTitle = `${title} | Blog Blog`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
} 
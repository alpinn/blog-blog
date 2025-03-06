/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-input',
    'rc-tree',
    'rc-table',
    'rc-field-form',
    'rc-dropdown',
    'rc-menu',
    'rc-virtual-list',
    'rc-trigger'
  ],
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};

module.exports = nextConfig; 
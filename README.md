# Blog Blog - Modern Blog Platform

A modern blog platform built with Next.js, TypeScript, Ant Design, and TailwindCSS. This application allows users to create, read, update, and delete blog posts through a clean and responsive interface.

## Features

- 📱 Responsive design - works on mobile, tablet, and desktop
- ✨ Modern UI with Ant Design components
- 🎨 Custom styling with TailwindCSS
- 🔍 SEO optimized
- 📝 Full CRUD operations for blog posts
- 📊 Pagination and dynamic loading
- 🎯 Type-safe with TypeScript
- 🚀 Fast and optimized with Next.js

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Then edit `.env.local` and add your GoRest API token:
- Get your token from [GoRest](https://gorest.co.in/)
- Replace `your_gorest_token_here` with your actual token

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
blog-blog/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Next.js pages
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── public/            # Static files
└── ...config files
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint for code quality

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Ant Design](https://ant.design/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [GoRest API](https://gorest.co.in/) - Backend API

## Features in Detail

### Blog Posts
- View all posts with pagination
- Create new posts
- Edit existing posts
- Delete posts
- Responsive post cards
- Rich text content

### UI/UX
- Clean and modern design
- Responsive navigation
- Loading states
- Error handling
- Form validation
- Confirmation dialogs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Blogie: A Modern Blogging Platform

This repository contains the source code for Blogie, a full-stack blogging application.

## Project Overview

Blogie is a feature-rich platform that allows users to create, publish, and discover blog posts. It provides a seamless and intuitive experience for both readers and writers, with a modern and responsive user interface.

## Project Structure

The project is organized into three main packages:

- **`backend`**: A serverless backend built with Cloudflare Workers and Hono, providing a robust and scalable API for the application.
- **`frontend`**: A dynamic and responsive frontend built with React and Vite, offering a rich and engaging user experience.
- **`common`**: A shared package containing common code and types used by both the frontend and backend, ensuring consistency and code reuse.

## Getting Started

To get started with Blogie, you'll need to have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blogie.git
   ```
2. **Install dependencies for each package:**
   ```bash
   cd blogie/backend
   npm install

   cd ../frontend
   npm install

   cd ../common
   npm install
   ```

### Available Scripts

**Backend (`backend`)**

- `npm run dev`: Start the backend server in development mode.
- `npm run deploy`: Deploy the backend to Cloudflare Workers.

**Frontend (`frontend`)**

- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Lint the frontend code.
- `npm run preview`: Preview the production build locally.

**Common (`common`)**

- `npm run test`: Run tests for the common package.

## Technologies Used

**Backend**

- [Cloudflare Workers](https://workers.cloudflare.com/): Serverless execution environment
- [Hono](https://hono.dev/): Fast, lightweight, and flexible web framework
- [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript

**Frontend**

- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/): Next-generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework
- [React Router](https://reactrouter.com/): Declarative routing for React applications

**Common**

- [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference

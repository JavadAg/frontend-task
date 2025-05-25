# Frontend User List App

A modern, accessible, and production-ready user list application built with Next.js, TypeScript, and SCSS (BEM). Features infinite scroll, search, filters, favorites, profile pages, CSV export, and more.

## Features

- User list with infinite scroll (optimized for large lists)
- Search by nationality and filter by gender
- Add/remove users to favorites (persisted in localStorage)
- Favorites page and user profile page
- Download current user list as CSV
- Responsive, accessible UI (keyboard, screen reader, skip links, ARIA)
- Dockerized for easy deployment

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [SCSS (BEM)](https://getbem.com/)

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Run the development server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run tests

```sh
npm test
```

### 4. Build for production

```sh
npm run build
npm start
```

## Docker Usage

Build and run the app in a container:

```sh
docker build -t frontend-task .
docker run -p 3000:3000 frontend-task
```

## Deployment

- **Vercel:** Push to GitHub/GitLab and import to [Vercel](https://vercel.com/). No extra config needed.
- **Docker:** Use the provided Dockerfile for any Docker-compatible host.

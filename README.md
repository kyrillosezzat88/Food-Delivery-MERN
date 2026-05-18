# Food Delivery MERN

A modern full-stack food delivery application with a customer storefront, admin dashboard, and Express/MongoDB backend.

## Overview

This repository includes three main apps:

- `backend/` — Node.js + Express API with MongoDB, authentication, email verification, Google login, file uploads, and order management.
- `Frontend/` — React + TypeScript customer storefront powered by Vite, Tailwind CSS, Redux Toolkit, and React Router.
- `admin/` — React + TypeScript admin dashboard for managing customers, drivers, orders, menu items, and settings.

## Key Features

- User authentication with email verification and JWT
- Google login support
- Browse product categories, items, and restaurant menu
- Cart and checkout flow with order creation
- Order detail and tracking screens
- Admin panel with user, driver, order, and menu management
- Backend role-based routes for users and admins
- Image upload support via Cloudinary
- Clean UI using Tailwind CSS
- Toast notifications and reusable loading/error components

## Screenshots

![Food delivery storefront](https://i.ibb.co/p6pyHR3d/tomato.png)

![Admin login](https://i.ibb.co/B5L1M2qB/Screenshot-2026-05-18-094338.png)

## Project Structure

- `backend/` — API server, database models, authentication, controllers, routes
- `Frontend/` — customer-facing storefront, cart, profile, order pages
- `admin/` — admin dashboard, protected routes, management pages

## Setup Instructions

First install dependencies for each app separately.

### Backend

```bash
cd backend
npm install
```

Create a `.env` file with the required variables:

```env
PORT=5000
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SERVER_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the backend server:

```bash
npm run dev
```

### Customer Frontend (`Frontend`)

```bash
cd Frontend
npm install
npm run dev
```

### Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

## Backend Features

- Express + TypeScript server
- MongoDB data modeling with Mongoose
- Authentication and authorization middleware
- Email verification and password/email flows
- Google OAuth integration
- Cloudinary file uploads
- Category, product, order, and user CRUD operations
- Pagination support for large lists

## Frontend Features

- React + TypeScript + Vite
- Tailwind CSS styling
- Redux Toolkit state management
- React Router v7 routing
- Axios API integration
- Form validation with Zod
- Toast notifications with React Toastify

## Notes

- `Frontend/` is the current customer-facing app.
- `admin/` is the administrative panel.

## Contribution

Feel free to contribute by opening issues or pull requests for bug fixes, new features, or UI improvements.

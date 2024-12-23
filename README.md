# Blog Express.js API

A RESTful API built with Express.js for managing a blog platform with authentication, posts, comments, and categories.

## Features

- User authentication (signup/login) with JWT
- Post management (create, read, list, filter by tags/categories)
- Comment system
- Category management
- Role-based access (admin, author, reader)
- MongoDB integration with Mongoose
- Input validation
- Protected routes with Passport.js

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd blog-expressjs-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=blog_db
JWT_SECRET=your_jwt_secret
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/signup` - Register a new user
- POST `/api/v1/auth/login` - Login user

### Posts
- GET `/api/v1/posts` - List all posts
- GET `/api/v1/posts/:id` - Get single post
- POST `/api/v1/posts` - Create new post
- GET `/api/v1/posts?tags=[]&categories=[]` - Filter posts

### Comments
- POST `/api/v1/posts/:postId/comments` - Add comment to post
- GET `/api/v1/posts/:postId/comments` - Get post comments
- DELETE `/api/v1/posts/:postId/comments/:commentId` - Delete comment

### Categories
- GET `/api/v1/categories` - List categories
- POST `/api/v1/categories` - Create category
- PUT `/api/v1/categories/:id` - Update category
- DELETE `/api/v1/categories/:id` - Delete category

## Technologies Used

- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Passport.js for route protection
- Express Validator for input validation
- Bcrypt for password hashing
- Nodemon for development

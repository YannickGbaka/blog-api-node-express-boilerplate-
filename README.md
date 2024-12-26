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

## Test Coverage
- Authentication (signup/login)
- Post operations (CRUD)
- Comment management
- Category management
- Protected routes
- Input validation
- Error handling

## API Endpoints

### Authentication
- POST `/api/v1/auth/signup` - Register a new user
  - Required fields: firstName, lastName, email, password, role
- POST `/api/v1/auth/login` - Login user
  - Required fields: email, password
  - Returns: JWT token

### Posts
- GET `/api/v1/posts` - List all posts
- GET `/api/v1/posts/:id` - Get single post
- POST `/api/v1/posts` - Create new post
- GET `/api/v1/posts?tags=[]&categories=[]` - Filter posts

### Comments
- POST `/api/v1/posts/:postId/comments` - Add comment to post
  - Required fields: content, author
- GET `/api/v1/posts/:postId/comments` - Get post comments
- DELETE `/api/v1/posts/:postId/comments/:commentId` - Delete comment

### Categories
- GET `/api/v1/categories` - List categories
- POST `/api/v1/categories` - Create category
- PUT `/api/v1/categories/:id` - Update category
- DELETE `/api/v1/categories/:id` - Delete category

## Testing

The project uses Jest for testing with an in-memory MongoDB instance for test isolation.

Run the test suite:
```bash
npm test
```

## Technologies Used

- Express.js - Web framework
- MongoDB with Mongoose - Database
- JWT - Authentication
- Passport.js - Route protection
- Express Validator - Input validation
- Bcrypt - Password hashing
- Jest - Testing framework
- Supertest - HTTP testing
- MongoDB Memory Server - Testing database
- Nodemon - Development server

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

ISC

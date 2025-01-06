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

### Using Docker (Recommended)

1. Clone the repository
```bash
git clone [repository-url]
cd blog-expressjs-api
```

2. Create a `.env` file (optional, default values are provided in docker-compose.yml)
```bash
PORT=3001
MONGO_URI=mongodb://mongodb:27017
MONGO_DB_NAME=blog
JWT_SECRET=your_jwt_secret
```

3. Build and start the containers
```bash
# Build and start all services in detached mode
docker-compose up -d

# View the logs
docker-compose logs -f web
```

4. Verify the installation
- API Server: http://localhost:3001
- MongoDB Express UI: http://localhost:8081

### Managing Docker Containers

```bash
# Stop all services
docker-compose down

# Rebuild and restart services
docker-compose up -d --build

# View logs of specific service
docker-compose logs -f [service-name]  # web, mongodb, redis, or mongo-express

# Reset data (removes volumes)
docker-compose down -v
```

### Troubleshooting Docker Setup

1. If ports are already in use:
```bash
# Check which process is using the port
lsof -i :3001
# or
netstat -ano | grep 3001

# Kill the process
kill -9 <PID>
```

2. If MongoDB fails to start:
```bash
# Remove existing volume
docker-compose down -v
# Restart services
docker-compose up -d
```

3. Check service status:
```bash
docker-compose ps
```

### Local Development Setup

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
- Cache operations

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
  - Required fields: title, content, categories, tags, author
- GET `/api/v1/posts?tags=[]&categories=[]` - Filter posts
- PUT `/api/v1/posts/:id/published` - Publish a post
- PUT `/api/v1/posts/:id/draft` - Move post to draft

### Comments
- POST `/api/v1/posts/:postId/comments` - Add comment to post
  - Required fields: content, author
- GET `/api/v1/posts/:postId/comments` - Get post comments
- DELETE `/api/v1/posts/:postId/comments/:commentId` - Delete comment

### Categories
- GET `/api/v1/categories` - List categories
- POST `/api/v1/categories` - Create category
  - Required fields: label
- PUT `/api/v1/categories/:id` - Update category
- DELETE `/api/v1/categories/:id` - Delete category

## Caching Strategy

The application uses Redis for caching:
- Post data is cached for 1 hour by default
- Cache is automatically invalidated on updates
- Cached data includes:
  - Individual posts
  - Post listings
  - Filtered results

## Project Structure

```
blog-expressjs-api/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── mongoose/        # Database models and schemas
│   ├── router/         # Route definitions
│   ├── services/       # Business logic
│   ├── strategies/     # Passport.js strategies
│   ├── test/          # Test suites
│   ├── utils/         # Utility functions
│   ├── index.js       # App configuration
│   └── server.js      # Server entry point
├── docker-compose.yml  # Docker services configuration
├── Dockerfile         # API container configuration
├── .env               # Environment variables
└── package.json       # Project dependencies
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
- Docker - Containerization
- Docker Compose - Multi-container orchestration

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

## Services

The application runs with the following services:

- **API Server**: Express.js application (Port 3001)
- **MongoDB**: Database (Port 27017)
- **Redis**: Caching layer (Port 6379)
- **Mongo Express**: Database management UI (Port 8081)

## Running the Application

### Docker Environment

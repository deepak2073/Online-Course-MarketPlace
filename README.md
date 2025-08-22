# Course Selling REST API

A simple Node.js and Express REST API for an online course-selling platform.  
Admins can create and manage courses, and users can browse, purchase, and view purchased courses.  
Uses MongoDB for data storage and JWT for authentication.

---

## Features

### Admin
- Sign up and login
- Create new courses
- Update existing courses
- View all courses

### User
- Sign up and login
- Browse published courses
- Purchase courses
- View purchased courses

---

## Technologies Used

- Node.js and Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication

---

## Installation & Running the Server

1. Install dependencies with:

2. Start the server:

3. Make sure MongoDB is running or update the connection string in the code.

---

## Authentication

- Admins and users receive JWT tokens on signup/login.
- Include the token in requests requiring authentication as a Bearer token in the `Authorization` header:

---

## API Endpoints

### Admin Routes

- **POST /admin/signup**  
  Register a new admin. Requires `username` and `password` in JSON body.

- **POST /admin/login**  
  Login admin with `username` and `password`.

- **POST /admin/courses**  
  Create a new course. Requires authentication. Provide course details (`title`, `description`, `price`, `published`) in JSON body.

- **PUT /admin/courses/:id**  
  Update a course by ID. Requires authentication. Provide updated fields in JSON body.

- **GET /admin/courses**  
  Get all courses. Requires authentication.

---

### User Routes

- **POST /users/signup**  
  Register a new user. Requires `username` and `password`.

- **POST /users/login**  
  Login user with `username` and `password`.

- **GET /users/courses**  
  Get all published courses. Requires authentication.

- **POST /users/courses/:courseId**  
  Purchase a course by course ID. Requires authentication.

- **GET /users/purchasedCourses**  
  View courses purchased by the logged-in user. Requires authentication.

---

## Notes

- Use JSON format for request bodies.
- For protected routes, always send the JWT token in the Authorization header.
- The `published` field should be a boolean (`true` or `false`).
- Ensure valid MongoDB ObjectId format when specifying IDs.

---

## License

This project is for educational purposes only.

# Blog App

## Description
A backend API for a blog app. This API allows users to create, read, update, and delete blog posts, as well as register and login using JWT authentication.

## Features ✨
- **User Authentication:** Register and log in with JWT tokens.
- **Post Management:** Create, read, update, and delete blog posts.
- **Post Visibility:** Control the privacy of posts (public or private).
- **User-Specific Posts:** View and manage posts created by the logged-in user.

## Technologies Used 🛠️
- **Node.js:** JavaScript runtime for building the server-side logic.
- **Express.js:** Web framework for building the API.
- **Sequelize:** ORM for interacting with the PostgreSQL database.
- **PostgreSQL:** Relational database to store user and post data.
- **JWT:** For secure user authentication.
- **bcrypt:** For hashing passwords.
- **validator:** Middleware for validating user inputs and requests.

## API Endpoints

### Auth
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive a JWT

### Blog Posts
- `GET /posts` – Get all public posts
- `GET /posts/:id` – Get a specific post
- `POST /posts` – Create a new post (requires auth)
- `PUT /posts/:id` – Update a post (requires auth)
- `DELETE /posts/:id` – Delete a post (requires auth)

### User's Posts
- `GET /posts/my-posts` – Get all posts by the authenticated user
- `GET /posts/my-posts/:id` – Get a specific post by the authenticated user

## How to Run 🚀
1. Clone this repository: `git clone https://github.com/lia-xyz/blog-app.git`
2. Install dependencies: `npm install`
3. Setup environment variables. Create a `.env` file and add the following:
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Run the server: `npm start`

## Contributing 🤝

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a pull request.

## License 📄
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
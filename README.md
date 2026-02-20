# Smart Workout Backend

This is the complete backend for the Smart Workout Fitness Website, built with Node.js, Express, and MongoDB.

## 🚀 Prerequisites

Before running this project, you must install:
1.  **Node.js**: [Download Here](https://nodejs.org/) (LTS Version recommended)
2.  **MongoDB**: [Download Community Server](https://www.mongodb.com/try/download/community) or use MongoDB Atlas.

## 🛠️ Installation

1.  Open this folder in VS Code or Terminal.
2.  Install dependencies:
    ```bash
    npm install
    ```

## ⚙️ Configuration

1.  A `.env` file has been created for you with default settings:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/smart-workout
    JWT_SECRET=your_super_secret_jwt_key_change_this
    ```
2.  Ensure your MongoDB server is running (if using local MongoDB).

## ▶️ Running the Server

- **Development Mode** (auto-restart on changes):
    ```bash
    npm run dev
    ```
- **Production Mode**:
    ```bash
    npm start
    ```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `PUT /api/users/assign-trainer` - Assign a trainer

### Trainers
- `GET /api/trainers` - List all trainers
- `GET /api/trainers/:id` - Get trainer details

### Content
- `GET /api/classes` - List workout classes
- `GET /api/exercises` - List exercises
- `GET /api/diet` - List diet plans
- `GET /api/guides` - List fitness guides

### Tracker
- `POST /api/tracker` - Log workout (Protected)
- `GET /api/tracker/history` - Get workout history (Protected)

## 📂 Project Structure

- `src/config`: Database connection
- `src/models`: Mongoose Schemas (User, Trainer, etc.)
- `src/controllers`: Logic for the API endpoints
- `src/routes`: API Route definitions
- `src/middleware`: Authentication middleware

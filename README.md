# Recipe Haven 🍳

A modern, full-stack recipe sharing application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

## Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 📝 **Recipe Management**: Create, read, update, and delete your own recipes
- ⭐ **Favorites System**: Mark recipes as favorites and view them anytime
- 🌓 **Global Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Beautiful UI**: Clean, modern design with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd recipe-App
\`\`\`

2. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd ../frontend
npm install
\`\`\`

4. Set up environment variables:
   - Create a `.env` file in the `backend` folder:
   \`\`\`
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   \`\`\`

5. Start the backend server:
\`\`\`bash
cd backend
npm run dev
\`\`\`

6. Start the frontend development server:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

7. Open your browser and navigate to `http://localhost:5173`

## Project Structure

\`\`\`
RecipeApp/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   │   └── images/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
\`\`\`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user

### Recipes
- `GET /recipe` - Get all recipes
- `GET /recipe/my` - Get user's recipes
- `GET /recipe/favorites` - Get user's favorite recipes
- `GET /recipe/:id` - Get recipe by ID
- `POST /recipe` - Create a new recipe
- `PUT /recipe/:id` - Update a recipe
- `DELETE /recipe/:id` - Delete a recipe
- `POST /recipe/:id/favorite` - Toggle favorite status

### User
- `GET /user/:id` - Get user by ID

## License

MIT License


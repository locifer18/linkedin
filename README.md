# Mini LinkedIn-like Community Platform

A full-stack social networking platform built for the CIAAN Cyber Tech Pvt Ltd internship challenge.

## 🚀 Live Demo
- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend**: [https://your-backend.render.com](https://your-backend.render.com)
- **GitHub**: [https://github.com/yourusername/linkedin-clone](https://github.com/yourusername/linkedin-clone)

## 📋 Features

### ✅ Completed Features
1. **User Authentication**
   - User registration with name, email, password, and bio
   - User login with email and password
   - JWT-based authentication
   - Protected routes

2. **Public Post Feed**
   - Create text-only posts
   - View all posts in chronological order (newest first)
   - Display author name and timestamp
   - Real-time post creation

3. **Profile Page**
   - View user profile with name, email, and bio
   - Display user's posts
   - Profile avatar with user initials
   - Dynamic profile routes

4. **Additional Features**
   - Responsive design for mobile and desktop
   - LinkedIn-like UI/UX
   - Toast notifications for user feedback
   - Loading states and error handling
   - Clean and modern interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Bootstrap 5** - CSS framework
- **Moment.js** - Date formatting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── postControllers.js
│   ├── helper/
│   │   └── authHelper.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── UserModel.js
│   │   └── PostModel.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   └── postRouter.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Layout.js
│   │   │   └── PostCard.js
│   │   ├── context/
│   │   │   └── authContext.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── Login.js
│   │   │   ├── Profile.js
│   │   │   └── Register.js
│   │   ├── styles/
│   │   │   └── AuthStyles.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development
   npm run server
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

### Running Both Servers
You can run both servers simultaneously from the backend directory:
```bash
npm run dev
```

## 🔐 Demo User Credentials

### Demo User Credentials
- **Email**: test@example.com
- **Password**: password123

*Or register a new account to test the registration flow*

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/user` - Get current user (protected)
- `GET /api/v1/auth/profile/:id` - Get user profile (protected)

### Posts
- `POST /api/v1/posts/create-post` - Create new post (protected)
- `GET /api/v1/posts/get-post` - Get all posts (protected)
- `GET /api/v1/posts/get-post/:id` - Get single post (protected)

## 🎨 Design Features

- **LinkedIn-inspired UI** with professional color scheme
- **Responsive design** that works on all devices
- **Clean typography** using system fonts
- **Intuitive navigation** with clear visual hierarchy
- **Interactive elements** with hover effects and transitions
- **Consistent spacing** and layout patterns

## 🔒 Security Features

- **Password hashing** using bcrypt
- **JWT authentication** for secure sessions
- **Protected routes** requiring authentication
- **Input validation** on both client and server
- **CORS configuration** for secure cross-origin requests

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

This project was built as part of an internship challenge. For any questions or improvements, please contact the development team.

## 📄 License

This project is created for educational and assessment purposes.

---

**Developed by**: [Your Name]  
**Email**: [Your Email]  
**Date**: August 7, 2025  
**Challenge**: CIAAN Cyber Tech Pvt Ltd Full Stack Development Internship  
**Submission**: Mini LinkedIn-like Community Platform
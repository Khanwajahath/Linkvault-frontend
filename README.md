# LinkVault

A modern web application for storing, organizing, and accessing your favorite links.

## Features

- User authentication with secure signup and login
- Store links with title, URL, and optional description
- Tag links for better organization and filtering
- One-click navigation to stored links
- Dark/light mode toggle
- Responsive design for all devices
- Search functionality to find links quickly

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local instance or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

Start the development server:

```
# Run both frontend and backend concurrently
npm run dev:full

# Or run them separately
npm run dev       # Frontend
npm run server    # Backend
```

## Project Structure

- `/src` - React frontend
  - `/components` - Reusable UI components
  - `/context` - React context providers
  - `/pages` - Page components
  - `/types` - TypeScript type definitions
- `/server` - Express backend
  - `/models` - Mongoose models
  - `/routes` - API routes
  - `/middleware` - Express middleware

## License

MIT
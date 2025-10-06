# Youth Sports Hub - Frontend & Backend Integration Guide

## Overview
This guide explains how to integrate the React frontend with the Node.js backend for the Youth Sports Hub application.

## Backend Setup

### 1. Install Dependencies
```bash
cd youth-sports-hub-backend
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and configure:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/youth_sports_hub
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Start Backend
```bash
npm run dev
```

## Frontend Setup

### 1. Install Dependencies
```bash
cd "youth-sports-hub 2/youth-sports-hub"
npm install
```

### 2. Environment Configuration
Copy `env.example` to `.env` and configure:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend
```bash
npm run dev
```

## API Integration

### Authentication Flow
1. **Registration**: Users register with name, email, password, and role
2. **Login**: Users login with email and password
3. **JWT Token**: Backend returns JWT token for authenticated requests
4. **Protected Routes**: Frontend uses token for API calls

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Player Profiles
- `POST /api/players` - Create/update player profile (Player role only)
- `GET /api/players` - List players with pagination
- `GET /api/players/:id` - Get single player profile

#### Events
- `POST /api/events` - Create event (Selector/Coach role only)
- `GET /api/events` - List events with pagination
- `GET /api/events/:id` - Get single event
- `POST /api/events/:id/interest` - Express interest (Player role only)
- `GET /api/events/:id/applicants` - Get applicants (Organizer only)

#### Engagements
- `POST /api/engagements/like` - Like player/event
- `POST /api/engagements/comment` - Comment on player/event
- `POST /api/engagements/follow` - Follow player

## Frontend Architecture

### Context Providers
- **AuthContext**: Manages user authentication state
- **ProfileContext**: Manages user profile data

### Services
- **api.ts**: Axios instance with interceptors for API calls
- **authAPI**: Authentication-related API calls
- **playerAPI**: Player profile API calls
- **eventAPI**: Event management API calls
- **engagementAPI**: Social engagement API calls

### Components
- **ProtectedRoute**: Route protection based on authentication and roles
- **Auth**: Login/Registration form with role selection

## Database Models

### User
- Basic user information with role-based access
- JWT authentication

### PlayerProfile
- Detailed player information
- Achievements and media
- Linked to User model

### Event
- Event details and management
- Interest tracking
- Organizer permissions

### Engagement
- Social interactions (likes, comments, follows)
- Flexible targeting system

## Role-Based Access Control

### Roles
- **Player**: Can create profiles, express interest in events
- **Selector**: Can create events, view applicants
- **Coach**: Can create events, view applicants
- **Fan**: Can engage with content

### Frontend Protection
- Route-level protection using ProtectedRoute component
- Role-based access control
- Automatic redirects for unauthorized access

## Development Workflow

1. Start MongoDB locally
2. Start backend server (`npm run dev` in backend folder)
3. Start frontend development server (`npm run dev` in frontend folder)
4. Access application at `http://localhost:5173`

## Testing the Integration

1. **Register a new user** with different roles
2. **Login** with existing credentials
3. **Create player profiles** (Player role)
4. **Create events** (Selector/Coach role)
5. **Express interest** in events (Player role)
6. **View applicants** (Event organizers)

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend CORS is configured
2. **Authentication Failures**: Check JWT_SECRET configuration
3. **Database Connection**: Verify MongoDB is running
4. **API Endpoints**: Check VITE_API_URL configuration

### Debug Steps
1. Check browser console for errors
2. Verify network requests in DevTools
3. Check backend logs for server errors
4. Validate environment variables

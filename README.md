# Syntecxhub Notes App API

A RESTful Notes API built with Node.js, Express, and MongoDB. Each note is tied to a user and only accessible by its owner.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register a new user |
| POST | /api/auth/login | Login and get token |

### Notes (All Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/notes | Create a note |
| GET | /api/notes | Get all user's notes |
| GET | /api/notes/:id | Get single note |
| PUT | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |
| PUT | /api/notes/:id/archive | Archive note |

## Authentication
All note routes require Bearer token in Authorization header.

## Installation
1. Clone the repo
2. Run `npm install`
3. Add `.env` with MONGO_URI, JWT_SECRET, JWT_EXPIRE, PORT
4. Run `npm run dev`

## Internship
Built as part of the Syntecxhub Backend Development Internship Program.
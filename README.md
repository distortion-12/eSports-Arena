🎮 eSports Arena
Welcome to eSports Arena, a full-stack web platform for discovering, hosting, and participating in esports tournaments and community-run scrims. This project is built with the MERN stack (MongoDB, Express.js, React, Node.js) and features a modern, responsive user interface.

The platform separates official, pro-level tournaments from user-created community events, providing a tailored experience for both professional players and the wider gaming community.

✨ Key Features
User Authentication: Secure user registration and login system with two-step OTP email verification.

Protected Routes: User dashboard and tournament creation are only accessible to logged-in users.

Official vs. Community Events:

Homepage: Displays a curated list of official, professional tournaments.

Community Page: Shows all user-created scrims and tournaments.

Tournament Management:

Logged-in users can create and host their own community tournaments.

Users can register for upcoming community events.

User Dashboard: A personal dashboard for users to view all the tournaments they have registered for.

Tournament Detail Pages: Click on any tournament to see detailed information, including the prize pool, date, and a list of registered players.

🛠️ Tech Stack
This project is a monorepo containing two separate applications: a React frontend and a Node.js backend.

Frontend
Framework: React.js

Routing: React Router

API Communication: Axios

Styling: Custom CSS with a glassmorphism and neon-glow aesthetic.

Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose

Authentication: JSON Web Tokens (JWT)

Password Hashing: bcryptjs

Email Service: Nodemailer with Gmail

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed on your machine.

A MongoDB Atlas account (or a local MongoDB instance).

A Gmail account with 2-Step Verification and an App Password for OTP email sending.

Installation & Setup
Clone the repository:

git clone https://github.com/distortion-12/eSports-Arena.git
cd eSports-Arena

Setup the Backend:

Navigate to the backend folder: cd backend

Install NPM packages: npm install

Create a .env file in the backend folder and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_gmail_app_password

Start the backend server: npm start
(The server will be running on http://localhost:5000)

Setup the Frontend:

Open a new terminal and navigate to the frontend folder: cd frontend

Install NPM packages: npm install

Start the frontend development server: npm start
(The React app will open and run on http://localhost:3000)

You should now be able to use the full application in your browser.

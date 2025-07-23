const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // 1. Import cors

dotenv.config();

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors()); // 2. Enable CORS for all routes
app.use(express.json());

// --- Define Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/players', require('./routes/players'));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the eSports Arena API 🚀' });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  }
};

startServer();
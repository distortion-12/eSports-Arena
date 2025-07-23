const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  gamerTag: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  realName: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  primaryGame: {
    type: String,
    required: true,
    enum: ['BGMI', 'Valorant', 'CS2', 'LoL'] // Example games
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Player', PlayerSchema);
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// @route   POST api/players
// @desc    Create a new player
router.post('/', async (req, res) => {
  console.log('Request body received:', req.body);
  try {
    const { gamerTag, realName, country, primaryGame } = req.body;

    // Check if player already exists
    let player = await Player.findOne({ gamerTag });
    if (player) {
      return res.status(400).json({ msg: 'Player with that gamerTag already exists' });
    }

    // Create a new player document
    const newPlayer = new Player({
      gamerTag,
      realName,
      country,
      primaryGame
    });

    player = await newPlayer.save();
    res.status(201).json(player);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add the other GET routes back
router.get('/', async (req, res) => {
    try {
      const players = await Player.find();
      res.json(players);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const player = await Player.findById(req.params.id);
  
      if (!player) {
        return res.status(404).json({ msg: 'Player not found' });
      }
  
      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
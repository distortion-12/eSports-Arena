const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const auth = require('../middleware/auth');

// @route   POST api/tournaments
// @desc    Create a community tournament
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, game, slots, entryFee, prizePool, date } = req.body;

    // Create a new tournament, linking it to the logged-in user
    const newTournament = new Tournament({
      title,
      game,
      slots,
      entryFee,
      prizePool,
      date,
      organizer: req.user.id, // Link to the user who created it
      isOfficial: false,     // User-created tournaments are never official
    });

    const tournament = await newTournament.save();
    res.status(201).json(tournament);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tournaments/official
// @desc    Get all OFFICIAL upcoming tournaments
// @access  Public
router.get('/official', async (req, res) => {
  try {
    const tournaments = await Tournament.find({ 
      isOfficial: true, 
      date: { $gte: new Date() } 
    }).sort({ date: 1 });
    
    res.json(tournaments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tournaments/community
// @desc    Get all COMMUNITY upcoming tournaments
// @access  Public
router.get('/community', async (req, res) => {
  try {
    const tournaments = await Tournament.find({ 
      isOfficial: false, 
      date: { $gte: new Date() } 
    }).sort({ date: 1 });
    
    res.json(tournaments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

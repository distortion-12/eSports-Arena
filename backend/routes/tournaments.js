const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const auth = require('../middleware/auth');

// @route   POST api/tournaments
// @desc    Create a community tournament
router.post('/', auth, async (req, res) => {
  try {
    const { title, game, slots, entryFee, prizePool, date } = req.body;
    const newTournament = new Tournament({
      title, game, slots, entryFee, prizePool, date,
      organizer: req.user.id,
      isOfficial: false,
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
router.get('/official', async (req, res) => {
  try {
    const tournaments = await Tournament.find({ isOfficial: true, date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(tournaments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tournaments/community
// @desc    Get all COMMUNITY upcoming tournaments
router.get('/community', async (req, res) => {
  try {
    const tournaments = await Tournament.find({ isOfficial: false, date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(tournaments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tournaments/:id/register
// @desc    Register for a tournament
router.post('/:id/register', auth, async (req, res) => {
    try {
      const tournament = await Tournament.findById(req.params.id);
      if (!tournament) return res.status(404).json({ msg: 'Tournament not found' });
      const isAlreadyRegistered = tournament.registrations.some(reg => reg.user.toString() === req.user.id);
      if (isAlreadyRegistered) return res.status(400).json({ msg: 'User already registered' });
      tournament.registrations.unshift({ user: req.user.id });
      await tournament.save();
      res.json(tournament.registrations);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route   GET api/tournaments/:id
// @desc    Get a single tournament by its ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('organizer', ['name'])
      .populate('registrations.user', ['name', 'country']);
    if (!tournament) return res.status(404).json({ msg: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Tournament not found' });
    res.status(500).send('Server Error');
  }
});

module.exports = router;
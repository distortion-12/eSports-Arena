// File: routes/users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail'); // 1. Import the email utility

// @route   POST api/users/register-start
// @desc    Step 1: Create user, generate and send OTP via email
router.post('/register-start', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingUser = await User.findOne({ email, isVerified: true });
    if (existingUser) {
      return res.status(400).json({ msg: 'A verified user with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await User.findOneAndUpdate(
      { email },
      { name, password: hashedPassword, otp, otpExpires, isVerified: false },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // --- 2. SEND THE REAL EMAIL ---
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to eSports Arena!</h2>
        <p>Thank you for signing up. Please use the following One-Time Password (OTP) to verify your email address.</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #007bff;">${otp}</p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    await sendEmail({
      email: email,
      subject: 'Your eSports Arena Verification Code',
      html: emailHtml,
    });
    // --- END OF EMAIL LOGIC ---

    // 3. IMPORTANT: We no longer send the OTP back in the response
    res.status(200).json({ msg: 'OTP has been sent to your email.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/register-verify
// @desc    Step 2: Verify OTP and complete registration
router.post('/register-verify', async (req, res) => {
    // ... this route remains unchanged ...
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({
          email,
          otp,
          otpExpires: { $gt: Date.now() },
        });
        if (!user) {
          return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '5h' },
          (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

// @route   GET api/users/my-tournaments
// @desc    Get all tournaments a user is registered for
router.get('/my-tournaments', auth, async (req, res) => {
    // ... this route remains unchanged ...
    try {
        const tournaments = await Tournament.find({ 
          'registrations.user': req.user.id 
        }).sort({ date: 1 });
        res.json(tournaments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

module.exports = router;
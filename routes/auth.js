const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../controllers/userController');
const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required.' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'Invalid username or password.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: 'Invalid username or password.' });

    req.session.user = user;
    res.json({ message: 'Logged in successfully!', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully.' });
  });
});

module.exports = router;
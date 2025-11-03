const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// @desc    Login user
// @route   POST /auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user._id);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

// @desc    Logout user
// @route   POST /auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});


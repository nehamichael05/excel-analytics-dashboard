const User = require('../models/User');
const Upload = require('../models/Upload');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getAllUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().populate('user', 'username email');
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching uploads' });
  }
};

module.exports = {
  getAllUsers,
  getAllUploads
};

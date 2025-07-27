const express = require('express');
const router = express.Router();
const { getUserUploads } = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');

// Get uploads by user
router.get('/history', authMiddleware, getUserUploads);

// Chart data API
router.get('/data/:id', authMiddleware, async (req, res) => {
  const Upload = require('../models/Upload');
  try {
    const upload = await Upload.findOne({ _id: req.params.id, user: req.user.id });
    if (!upload) return res.status(404).json({ message: 'Data not found' });
    res.json(upload.data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving chart data' });
  }
});

module.exports = router;

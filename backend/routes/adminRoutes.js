const express = require('express');
const router = express.Router();
const { getAllUsers, getAllUploads } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/users', adminMiddleware, getAllUsers);
router.get('/uploads', adminMiddleware, getAllUploads);

module.exports = router;

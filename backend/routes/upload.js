const express = require('express');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { uploadExcel } = require('../controllers/uploadController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/excel', auth, uploadMiddleware.single('file'), uploadExcel);

module.exports = router;

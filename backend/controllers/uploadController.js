const xlsx = require('xlsx');
const Upload = require('../models/Upload');
const User = require('../models/User');
const path = require('path');

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const upload = new Upload({
      user: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      data: sheetData,
    });
    await upload.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { uploads: upload._id } });
    res.status(201).json({ message: 'File uploaded and parsed', upload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving upload history' });
  }
};

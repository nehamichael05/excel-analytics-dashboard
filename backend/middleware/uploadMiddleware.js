const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === '.xls' || ext === '.xlsx') {
    cb(null, true);
  } else {
    cb(new Error('Only .xls and .xlsx files are allowed'), false);
  }
};

module.exports = multer({ storage, fileFilter });

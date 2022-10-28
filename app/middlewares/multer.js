const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb({ message: 'File format is not supported.' }, false);
  }
};

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 3000000 },
  fileFilter,
});

module.exports = uploadMiddleware;

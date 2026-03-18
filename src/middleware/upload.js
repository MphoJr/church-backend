const multer = require("multer");
const path = require("path");

// Configure storage: save files in /uploads with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Only accept audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed"), false);
  }
};

// Export the configured multer instance directly
const upload = multer({ storage, fileFilter });

module.exports = upload;

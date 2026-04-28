const express = require("express");
const router = express.Router();
const {
  uploadSermon,
  listSermons,
  getSermonById,
} = require("../controllers/sermonController");
const multer = require("multer");
const path = require("path");
const authenticateToken = require("../middleware/auth"); // your JWT middleware

// Configure Multer for audio uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /sermons → protected (only logged-in admins can upload)
router.post("/", authenticateToken, upload.single("audio"), uploadSermon);

// GET /sermons → public (anyone can view sermons)
router.get("/", listSermons);

// GET /sermons/:id → public (anyone can view a specific sermon)
router.get("/:id", getSermonById);

module.exports = router;

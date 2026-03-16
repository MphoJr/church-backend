const express = require("express");
const {
  createSermon,
  getSermons,
  getSermonById,
  updateSermon,
  deleteSermon,
} = require("../controllers/sermonController");
const authenticateToken = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Protected routes
router.post("/", authenticateToken, createSermon);
router.put("/:id", authenticateToken, updateSermon);
router.delete("/:id", authenticateToken, deleteSermon);

// Public routes
router.get("/", getSermons);
router.get("/:id", getSermonById);

module.exports = router;

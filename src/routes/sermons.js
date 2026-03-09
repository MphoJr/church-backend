const express = require("express");
const {
  createSermon,
  getSermons,
  getSermonById,
  updateSermon,
  deleteSermon,
} = require("../controllers/sermonController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Protected routes
router.post("/", authenticateToken, createSermon);
router.put("/:id", authenticateToken, updateSermon);
router.delete("/:id", authenticateToken, deleteSermon);

// Public routes
router.get("/", getSermons);
router.get("/:id", getSermonById);

module.exports = router;

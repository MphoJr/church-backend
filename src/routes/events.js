const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// Protected routes (only admins with JWT can modify)
router.post("/", authenticateToken, createEvent);
router.put("/:id", authenticateToken, updateEvent);
router.delete("/:id", authenticateToken, deleteEvent);

// Public routes (anyone can view)
router.get("/", getEvents);
router.get("/:id", getEventById);

module.exports = router;

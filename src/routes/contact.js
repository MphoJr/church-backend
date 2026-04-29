const express = require("express");
const router = express.Router();
const {
  sendMessage,
  listMessages,
  deleteMessage,
} = require("../controllers/contactController");
const authenticateToken = require("../middleware/authenticateToken");

// Public route → anyone can send a message
router.post("/", sendMessage);

// Protected route → only admins can view messages
router.get("/", authenticateToken, listMessages);

// Protected route → only admins can delete messages
router.delete("/:id", authenticateToken, deleteMessage);

module.exports = router;

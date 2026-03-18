const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/auth"); // must export a function
const upload = require("../middleware/upload"); // multer instance
// POST /sermons - upload a new sermon with audio
router.post(
  "/sermons",
  authenticateToken,
  upload.single("audio"), // Multer handles audio file
  async (req, res) => {
    try {
      const { title, description, date } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Audio file required" });
      }

      const sermon = await prisma.sermon.create({
        data: {
          title,
          description,
          date: new Date(date),
          audioUrl: `/uploads/${req.file.filename}`, // store file path
        },
      });

      res.status(201).json(sermon);
    } catch (err) {
      console.error("Error creating sermon:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// GET /sermons - list all sermons
router.get("/sermons", authenticateToken, async (req, res) => {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: "desc" },
    });
    res.json(sermons);
  } catch (err) {
    console.error("Error fetching sermons:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

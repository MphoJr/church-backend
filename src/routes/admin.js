const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../config/db");
const router = express.Router();

// Register new admin (run once to seed)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if admin already exists
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: "Admin already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const admin = await prisma.admin.create({
    data: { email, password: hashedPassword },
  });

  res.json({
    message: "Admin created successfully",
    admin: { id: admin.id, email: admin.email },
  });
});

module.exports = router;

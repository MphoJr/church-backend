const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;

const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });

    res.json({
      message: "Admin registered successfully",
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    console.error("Error registering admin:", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in admin:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getSermonById = async (req, res) => {
  const { id } = req.params;

  try {
    const sermon = await prisma.sermon.findUnique({
      where: { id: parseInt(id) },
    });

    if (!sermon) {
      return res.status(404).json({ error: "Sermon not found" });
    }

    res.json(sermon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sermon" });
  }
};


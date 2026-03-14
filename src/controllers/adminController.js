const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /admin/register
exports.registerAdmin = async (req, res) => {
  const { email, password, secret } = req.body;

  try {
    // Only allow if secret matches your .env ADMIN_SECRET
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

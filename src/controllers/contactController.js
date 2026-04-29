const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Handle contact form submission
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({
      message: "Message received successfully",
      contactMessage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Optional: list all messages (admin only)
exports.listMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contactMessage.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
};

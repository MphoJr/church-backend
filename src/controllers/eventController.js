const prisma = require("../config/db");

// CREATE
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const event = await prisma.event.create({
    data: { title, description, date: new Date(date) },
  });
  res.json(event);
};

// READ (all)
exports.getEvents = async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
};

// READ (single)
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
};

// UPDATE
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const event = await prisma.event.update({
    where: { id: parseInt(id) },
    data: { title, description, date: new Date(date) },
  });
  res.json(event);
};

// DELETE
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  await prisma.event.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Event deleted successfully" });
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

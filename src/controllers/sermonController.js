const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE
exports.createSermon = async (req, res) => {
  const { title, preacher, content } = req.body;
  const sermon = await prisma.sermon.create({
    data: { title, preacher, content },
  });
  res.json(sermon);
};

// READ (all)
exports.getSermons = async (req, res) => {
  const sermons = await prisma.sermon.findMany();
  res.json(sermons);
};

// READ (single)
exports.getSermonById = async (req, res) => {
  const { id } = req.params;
  const sermon = await prisma.sermon.findUnique({
    where: { id: parseInt(id) },
  });
  if (!sermon) return res.status(404).json({ error: "Sermon not found" });
  res.json(sermon);
};

// UPDATE
exports.updateSermon = async (req, res) => {
  const { id } = req.params;
  const { title, preacher, content } = req.body;
  const sermon = await prisma.sermon.update({
    where: { id: parseInt(id) },
    data: { title, preacher, content },
  });
  res.json(sermon);
};

// DELETE
exports.deleteSermon = async (req, res) => {
  const { id } = req.params;
  await prisma.sermon.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Sermon deleted successfully" });
};

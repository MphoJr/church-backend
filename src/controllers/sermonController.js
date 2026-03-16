const prisma = require("../config/db");

// CREATE
exports.createSermon = async (req, res) => {
  try {
    const { title, preacher, content, date } = req.body;
    const audioUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const sermon = await prisma.sermon.create({
      data: {
        title,
        preacher,
        content,
        date: date ? new Date(date) : new Date(),
        audioUrl,
      },
    });

    res.json({ message: "Sermon uploaded successfully!", sermon });
  } catch (err) {
    console.error("Error creating sermon:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
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

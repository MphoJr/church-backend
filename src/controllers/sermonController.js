const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Upload sermon
exports.uploadSermon = async (req, res) => {
  const { title, preacher, date, content } = req.body;
  const audioUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const sermon = await prisma.sermon.create({
      data: {
        title,
        preacher,
        date: new Date(date),
        content,
        audioUrl,
      },
    });
    res.status(201).json({ message: "Sermon uploaded successfully", sermon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload sermon" });
  }
};

// List sermons
exports.listSermons = async (req, res) => {
  try {
    const sermons = await prisma.sermon.findMany({ orderBy: { date: "desc" } });
    res.json(sermons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sermons" });
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

exports.deleteSermon = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sermon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Sermon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete sermon" });
  }
};

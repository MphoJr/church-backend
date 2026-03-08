router.post("/", async (req, res) => {
  const { title, preacher, content } = req.body;
  const sermon = await prisma.sermon.create({
    data: { title, preacher, content },
  });
  res.json(sermon);
});

router.get("/", async (req, res) => {
  const sermons = await prisma.sermon.findMany();
  res.json(sermons);
});

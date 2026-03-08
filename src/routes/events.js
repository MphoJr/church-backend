router.post("/", async (req, res) => {
  const { title, description, date } = req.body;
  const event = await prisma.event.create({
    data: { title, description, date: new Date(date) },
  });
  res.json(event);
});

router.get("/", async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

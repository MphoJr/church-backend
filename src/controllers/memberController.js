// controllers/memberController.js
exports.addMember = async (req, res) => {
  const member = await prisma.member.create({ data: req.body });
  res.json(member);
};

exports.getMembers = async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const member = await prisma.member.update({
    where: { id: parseInt(req.params.id) },
    data: { status },
  });
  res.json(member);
};

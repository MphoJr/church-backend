const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.post("/", memberController.addMember);
router.get("/", memberController.getMembers);
router.put("/:id/status", memberController.updateStatus);

module.exports = router;

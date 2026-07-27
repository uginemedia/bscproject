const express = require("express");

const router = express.Router();

const {
  createBloodRequest,
  findMatchingDonors,
} = require("../controllers/bloodRequestController");

router.post("/", createBloodRequest);
router.get("/:requestId/match", findMatchingDonors);

module.exports = router;

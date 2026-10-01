const express = require("express");

const router = express.Router();

const {
  createBloodRequest,
  findMatchingDonors,
  getHospitalRequests,
  getBloodRequest,
} = require("../controllers/bloodRequestController");

router.post("/", createBloodRequest);
router.get("/:requestId/match", findMatchingDonors);
router.get("/hospital/:hospitalId", getHospitalRequests);
router.get("/:id", getBloodRequest);

module.exports = router;

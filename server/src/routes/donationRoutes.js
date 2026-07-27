const express = require("express");

const router = express.Router();

const { respondToRequest } = require("../controllers/donationController");

router.post("/respond", respondToRequest);

module.exports = router;

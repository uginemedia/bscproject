const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Create a new blood request
const createBloodRequest = async (req, res) => {
  try {
    // 1. Create the blood request
    const bloodRequest = await BloodRequest.create(req.body);

    // TEMPORARY: Check all registered donors
    const allDonors = await User.find({
      role: "donor",
    }).select("fullName bloodGroup state city isAvailable");

    // 2. Find matching donors
    const donors = await User.find({
      role: "donor",
      bloodGroup: bloodRequest.bloodGroup,
      state: bloodRequest.state,
      isAvailable: true,
    }).select("-password");

    // 3. Create notifications
    const notifications = donors.map((donor) => ({
      recipient: donor._id,
      sender: bloodRequest.hospital,
      bloodRequest: bloodRequest._id,
      title: "Emergency Blood Request",
      message: `${bloodRequest.unitsNeeded} unit(s) of ${bloodRequest.bloodGroup} blood is urgently needed in ${bloodRequest.city}, ${bloodRequest.state}.`,
    }));

    // 4. Save notifications
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      success: true,
      message: "Blood request created successfully.",
      totalMatches: donors.length,
      bloodRequest,
      matchedDonors: donors,
    });
  } catch (error) {
    console.error("Create Blood Request Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Find Matching Donors
const findMatchingDonors = async (req, res) => {
  try {
    const { requestId } = req.params;

    // 1. Find the blood request
    const request = await BloodRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    // 2. Search for donors in the same city
    let donors = await User.find({
      role: "donor",
      bloodGroup: request.bloodGroup,
      state: request.state,
      city: request.city,
      isAvailable: true,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    // 3. If no city matches, search the same state
    if (donors.length === 0) {
      donors = await User.find({
        role: "donor",
        bloodGroup: request.bloodGroup,
        state: request.state,
        isAvailable: true,
      })
        .select("-password")
        .sort({ createdAt: -1 });
    }

    // 4. Return matching donors
    res.status(200).json({
      success: true,
      totalMatches: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Hopsital Requests
const getHospitalRequests = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const requests = await BloodRequest.find({
      hospital: hospitalId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Blood Requests
const getBloodRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBloodRequest,
  findMatchingDonors,
  getHospitalRequests,
  getBloodRequest,
};

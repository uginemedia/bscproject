const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");
const Notification = require("../models/Notification");

// Create a new blood request
const createBloodRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.create(req.body);

    // 2. Find matching donors
    const donors = await User.find({
      role: "donor",
      bloodGroup: bloodRequest.bloodGroup,
      state: bloodRequest.state,
      isAvailable: true,
    }).select("-password");

    // 3. Save the matched donor IDs in the blood request
    const notifications = donors.map((donor) => ({
      recipient: donor._id,
      sender: bloodRequest.hospital,
      bloodRequest: bloodRequest._id,
      title: "Emergency Blood Request",
      message: `${bloodRequest.unitsNeeded} unit(s) of ${bloodRequest.bloodGroup} blood is urgently needed in ${bloodRequest.city}, ${bloodRequest.state}.`,
    }));

    await Notification.insertMany(notifications);
    // 4. Create a notification for each matched donor
    for (const donor of donors) {
      await Notification.create({
        recipient: donor._id,
        sender: bloodRequest.hospital,
        bloodRequest: bloodRequest._id,
        title: "Emergency Blood Request",
        message: `${bloodRequest.unitsNeeded} unit(s) of ${bloodRequest.bloodGroup} blood is urgently needed in ${bloodRequest.city}, ${bloodRequest.state}.`,
      });
    }

    res.status(201).json({
      success: true,
      message: "Blood request created successfully.",
      bloodRequest,
    });
  } catch (error) {
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

    const request = await BloodRequest.findById(requestId);
    console.log(request);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    const donors = await User.find({
      role: "donor",
      bloodGroup: request.bloodGroup,
      state: request.state,
      isAvailable: true,
    })
      .select("-password")
      .sort({ createdAt: -1 });

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

module.exports = {
  createBloodRequest,
  findMatchingDonors,
};

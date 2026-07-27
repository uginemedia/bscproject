const Notification = require("../models/Notification");

// Get all notifications for one user
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "fullName hospitalName")
      .populate("bloodRequest")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
};

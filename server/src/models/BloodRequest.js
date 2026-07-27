const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    unitsNeeded: {
      type: Number,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Critical"],
      default: "Normal",
    },

    reason: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Matched", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);

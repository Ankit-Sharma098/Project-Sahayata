import mongoose from "mongoose";

const victimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    emergencyType: {
      type: String,
      enum: [
        "Medical",
        "Accident",
        "Fire",
        "Flood",
        "Earthquake",
        "Crime",
        "Other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },

    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedNGO: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    aiSeverity: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Victim", victimSchema);
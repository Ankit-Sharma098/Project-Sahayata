import mongoose from "mongoose";

const airReportSchema = new mongoose.Schema(
  {
    // User who created report
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Report Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Detailed Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary Image URL
    image: {
      type: String,
      default: "",
    },

    // Pollution Category
    category: {
      type: String,
      enum: [
        "Smoke",
        "Dust",
        "Industrial Pollution",
        "Vehicle Emission",
        "Construction Dust",
        "Garbage Burning",
        "Other",
      ],
      default: "Other",
    },

    // GeoJSON Location (Future Google Maps Support)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },

      address: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },
    },

    // Weather Snapshot
    weather: {
      temperature: {
        type: Number,
        default: null,
      },

      humidity: {
        type: Number,
        default: null,
      },

      windSpeed: {
        type: Number,
        default: null,
      },

      condition: {
        type: String,
        default: "",
      },
    },

    // AQI Information
    aqiData: {
      value: {
        type: Number,
        default: 0,
      },

      level: {
        type: String,
        default: "",
      },

      pollutant: {
        type: String,
        default: "",
      },
    },

    // AI Analysis Result
    aiAnalysis: {
      predictedCategory: {
        type: String,
        default: "",
      },

      confidence: {
        type: Number,
        default: 0,
      },

      severity: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Low",
      },

      recommendation: {
        type: String,
        default: "",
      },

      healthRisk: {
        type: String,
        default: "",
      },

      suggestedAuthority: {
        type: String,
        default: "",
      },
    },

    // Municipality Workflow
    status: {
      type: String,
      enum: [
        "Pending",
        "Verified",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Pending",
    },

    // Pollution Impact Score
    impactScore: {
      score: {
        type: Number,
        default: 0,
      },

      level: {
        type: String,
        default: "",
      },

      calculatedAt: {
        type: Date,
        default: Date.now,
      },
    },

    // AI / Municipality Remarks
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// GeoSpatial Index (Google Maps / Nearby Search / Heatmap)
airReportSchema.index({
  location: "2dsphere",
});

export default mongoose.model("AirReport", airReportSchema);
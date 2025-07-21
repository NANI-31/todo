const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },

    dueDate: Date,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    category: { type: String }, // e.g., Work, Personal
    tags: [String],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // collaboration

    recurrence: {
      frequency: {
        type: String,
        enum: ["None", "Daily", "Weekly", "Monthly"],
        default: "None",
      },
      interval: { type: Number, default: 1 }, // Every N days/weeks/months
    },

    reminder: {
      enabled: { type: Boolean, default: false },
      time: Date,
    },

    sortIndex: { type: Number }, // for drag & drop ordering

    deleted: { type: Boolean, default: false }, // soft delete
  },
  { timestamps: true }
);

taskSchema.index({ title: "text", description: "text", tags: 1 }); // for search

module.exports = mongoose.model("Task", taskSchema);

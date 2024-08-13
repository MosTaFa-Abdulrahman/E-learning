const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", SectionSchema);

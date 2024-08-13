const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseImg: { type: String, default: "" },
    className: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

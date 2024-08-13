const mongoose = require("mongoose");
const QuestionSchema = require("./Question").schema;

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  questions: [QuestionSchema],
  timer: { type: Number, required: true },
  className: { type: String, default: "", trim: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);

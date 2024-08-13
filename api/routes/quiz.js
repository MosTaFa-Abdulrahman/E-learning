const router = require("express").Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const User = require("../models/User");
const { protectedRoute, roleBasedAccess } = require("../utils/protectedRoute");
// roleBasedAccess(["admin"]),

// Create ((Quiz)) With ((Questions))
router.post("/create", async (req, res) => {
  try {
    const { title, questions, timer, className } = req.body;

    const questionPromises = questions.map(async (question) => {
      const newQuestion = new Question(question);
      return await newQuestion.save();
    });
    const savedQuestions = await Promise.all(questionPromises);
    const newQuiz = new Quiz({
      title,
      timer,
      className,
      questions: savedQuestions,
    });

    const savedQuiz = await newQuiz.save();
    res.status(200).json(savedQuiz);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get All Quizzes
router.get("/get/all/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single quiz
router.get("/get/:quizId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json("Quiz not found");
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete quiz
router.delete("/delete/:quizId", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
    if (!quiz) {
      return res.status(404).json("Quiz Failed Deleted 😥");
    }

    await Question.deleteMany({ _id: { $in: quiz.questions } });

    res.status(200).json("Deleted Successfully 🤩");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update quiz
router.put("/update/:quizId", async (req, res) => {
  const quizId = req.params.quizId;
  const { title, questions, className } = req.body;

  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json("Quiz not found");
    }

    // Validate incoming data
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Title and questions are required" });
    }

    questions.forEach((question) => {
      const { question: q, options, answer } = question;
      if (!q || !Array.isArray(options) || options.length === 0 || !answer) {
        throw new Error(
          "Each question must have a question, options, and answer"
        );
      }
    });

    // Update the quiz title and questions
    quiz.title = title;
    quiz.questions = questions;
    quiz.className = className;

    // Save the updated quiz
    await quiz.save();
    res.status(200).json("Quiz updated successfully");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating quiz", error: error.message });
  }
});

// Submit quiz results for ((User))
router.post("/submit", async (req, res) => {
  // const userId = req.user.id;
  const { quizId, answers, userId } = req.body;

  try {
    const user = await User.findById(userId);
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json("Quiz not found");
    }

    // Check if user has already completed the quiz
    if (
      user.completedQuizzes.some(
        (completedQuiz) => completedQuiz.quizId.toString() === quizId
      )
    ) {
      return res.status(400).json("You have already completed this quiz.");
    }

    // Calculate score (example logic)
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        score += 1;
      }
    });

    // Update user's quiz results
    user.quizResults.push({
      quizId,
      score,
      title: quiz.title,
    });

    user.completedQuizzes.push({
      quizId,
    });

    await user.save();

    res.status(200).json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const router = require("express").Router();
const Course = require("../models/Course");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { protectedRoute } = require("../utils/protectedRoute");

// ADD Payment
router.post("/pay", async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Validate IDs
    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: "User ID and Course ID are required" });
    }

    // Find user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update user's purchased courses
    user.purchasedCourses = user.purchasedCourses || [];
    user.purchasedCourses.push({
      courseId: courseId,
      title: course.title,
    });
    await user.save();

    res.status(200).json({ message: "Payment processed successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error processing payment", error: error.message });
  }
});

// Update Password
router.put("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email and new password are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: "Password updated Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Previous Users Count
router.get("/get/previous-count", async (req, res) => {
  try {
    const startOfCurrentMonth = new Date();
    startOfCurrentMonth.setDate(1);
    startOfCurrentMonth.setHours(0, 0, 0, 0);

    const previousUserCount = await User.countDocuments({
      createdAt: { $lt: startOfCurrentMonth },
    });

    res.json({ count: previousUserCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Random 7 Users without (Admin)
router.get("/get/random", async (req, res) => {
  try {
    const randomUsers = await User.aggregate([
      { $match: { role: { $ne: "admin" } } },
      { $sample: { size: 7 } },
    ]);
    if (!randomUsers)
      return res.status(404).json({ message: "Random Users not found 😥" });
    else res.status(200).json(randomUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All
router.get("/get/all", async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { role: { $ne: "admin" } } },
    ]).sort({ createdAt: -1 });
    if (!users) return res.status(404).json({ message: "Users not found 😥" });
    else res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single with ((quizResults))
router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "quizResults.quizId"
    );
    if (!user) return res.status(404).json({ message: "User not found 😥" });
    else res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Single with ((User))
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found 😥" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Find User By ((Email))
router.get("/get-user-by-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    else {
      await user.remove();
      res.status(200).json({ message: "User deleted successfully 🥰" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check User
    const { email, username } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists 🙄🧐" });
    } else {
      const salt = bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(req.body.password, parseInt(salt));
      const newUser = new User({ ...req.body, password: hashPassword });
      await newUser.save();

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);

        res.status(200).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          profilePic: newUser.profilePic,
          phone: newUser.phone,
          fatherPhone: newUser.fatherPhone,
          className: newUser.className,
          role: newUser.role,
          quizResults: newUser.quizResults,
          completedQuizzes: newUser.completedQuizzes,
          purchasedCourses: newUser.purchasedCourses,
        });
      } else res.status(400).json({ error: "Invalid user data 😥" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "User already exists 🙄🧐" });
    } else {
      const validatePassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validatePassword) {
        return res.status(404).json({ error: "Wrong Password 😥" });
      } else {
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePic: user.profilePic,
          phone: user.phone,
          fatherPhone: user.fatherPhone,
          className: user.className,
          role: user.role,
          quizResults: user.quizResults,
          completedQuizzes: user.completedQuizzes,
          purchasedCourses: user.purchasedCourses,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully 😍" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

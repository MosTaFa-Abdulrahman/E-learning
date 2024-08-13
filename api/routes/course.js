const router = require("express").Router();
const Course = require("../models/Course");
const Section = require("../models/Section");
const User = require("../models/User");
const { protectedRoute, roleBasedAccess } = require("../utils/protectedRoute");
//   roleBasedAccess(["admin"]),

// Create
router.post("/create", async (req, res) => {
  try {
    const {
      createdBy,
      title,
      description,
      category,
      price,
      className,
      courseImg,
    } = req.body;

    const newCourse = new Course({
      createdBy,
      title,
      description,
      category,
      price,
      className,
      courseImg,
    });
    await newCourse.save();

    res.status(200).json(newCourse);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update
router.put("/update/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: "Course not found 😯" });
    else {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCourse);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/delete/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: "Course not found 😯" });
    else {
      await Section.deleteMany({ _id: { $in: course.sections } });
      await Course.findByIdAndDelete(req.params.courseId);
      res.status(200).json({ message: "Course Deleted Successful 🥰" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Previous Courses Count
router.get("/get/previous-count", async (req, res) => {
  try {
    const startOfCurrentMonth = new Date();
    startOfCurrentMonth.setDate(1);
    startOfCurrentMonth.setHours(0, 0, 0, 0);

    const previousCourseCount = await Course.countDocuments({
      createdAt: { $lt: startOfCurrentMonth },
    });

    res.status(200).json({ count: previousCourseCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All
router.get("/get/all", async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      "_id title description courseImg className category price"
    ).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Find All
router.get("/find/all", async (req, res) => {
  try {
    const courses = await Course.find({}, "title _id").sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Random 6 Courses
router.get("/get/random", async (req, res) => {
  try {
    const randomCourses = await Course.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          courseImg: 1,
          className: 1,
          category: 1,
          price: 1,
        },
      },
    ]);
    if (!randomCourses)
      return res.status(404).json({ message: "Random Users not found 😥" });
    else res.status(200).json(randomCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Course
router.get("/get/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("createdBy")
      .populate("sections");

    if (!course) {
      return res.status(404).json({ error: "Course not found 😯" });
    } else res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

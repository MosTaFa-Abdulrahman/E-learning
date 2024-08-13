const router = require("express").Router();
const Course = require("../models/Course");
const Section = require("../models/Section");
const Video = require("../models/Video");
const mongoose = require("mongoose");

// Create
router.post("/create", async (req, res) => {
  try {
    const { title, courseId } = req.body;

    // find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        error: "Course not Found 😥",
      });
    }

    if (!title) {
      return res.status(400).json({
        error: "title fields are required 😎",
      });
    } else {
      const newSection = new Section({ title, courseId: course._id });
      const savedSection = await newSection.save();
      course.sections.push(savedSection._id);
      await course.save();

      res.status(200).json(newSection);
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/delete/:sectionId", async (req, res) => {
  try {
    // Find Section && Course
    const section = await Section.findById(req.params.sectionId);
    if (!section)
      return res.status(404).json({ error: "Section not found 😯" });

    const course = await Course.findById(section.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found 😯" });
    }

    // Remove the section reference from the course
    course.sections.pull(req.params.sectionId);
    await course.save();

    // Delete the section
    await Section.findByIdAndDelete(req.params.sectionId);
    res.status(200).json("Section deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/update/:sectionId", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section)
      return res.status(404).json({ error: "Section not found 😯" });
    else {
      const updatedSection = await Section.findByIdAndUpdate(
        req.params.sectionId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedSection);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Sections For Specific  ((Course))
router.get("/get/:courseId", async (req, res) => {
  const { courseId } = req.params;

  // Validate the courseId to ensure it's a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid courseId" });
  }

  try {
    // Query the Section model to find all sections where courseId matches
    const sections = await Section.find({ courseId: courseId }).exec();

    // For each section, fetch the associated videos
    const sectionsWithVideos = await Promise.all(
      sections.map(async (section) => {
        const videos = await Video.find({ sectionId: section._id }).exec();
        return {
          ...section.toObject(),
          videos,
        };
      })
    );

    res.status(200).json(sectionsWithVideos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Find All for Admin
router.get("/find/all", async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("courseId", "title")
      .sort({ createdAt: -1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all sections for a specific course
router.get("/get/all/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const sections = await Section.find({ courseId }).sort({ createdAt: -1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single
router.get("/get/:sectionId", async (req, res) => {
  try {
    const singleSection = await Section.findById(req.params.sectionId)
      .populate("courseId")
      .populate("videos");
    if (!singleSection) {
      return res.status(404).json({ error: "Section not found 😯" });
    } else {
      res.status(200).json(singleSection);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get All Videos For Special ((Section))
router.get("/get/videos/:sectionId", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId)
      .populate("videos")
      .exec();

    if (!section) {
      return res.status(404).json("Section not found 😯");
    } else {
      res.status(200).json(section.videos);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;

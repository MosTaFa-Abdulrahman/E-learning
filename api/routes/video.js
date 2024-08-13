const router = require("express").Router();
const Video = require("../models/Video");
const Section = require("../models/Section");

// Create
router.post("/create", async (req, res) => {
  try {
    const { courseId, sectionId, title, videoUrl } = req.body;

    if (!courseId || !sectionId || !title || !videoUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check Section
    const section = await Section.findById(sectionId);
    if (!section) {
      res.status(400).json("Section not found 😥");
    } else {
      const video = new Video({ courseId, sectionId, title, videoUrl });
      await video.save();
      section.videos.push(video._id);
      await section.save();

      res.status(200).json(video);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Create Video" });
  }
});

// Delete
router.delete("/delete/:videoId", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found 😯" });
    else {
      await Video.deleteOne({ _id: req.params.videoId });
      const section = await Section.findById(video.sectionId);

      if (section) {
        section.videos = section.videos.filter(
          (videoId) => !videoId.equals(videoId)
        );
        await section.save();
      }

      res.status(200).json("Video Deleted Successful 😍");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/update/:videoId", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found 😯" });
    else {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All for ((Admin))
router.get("/get/all", async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("courseId", "title")
      .populate("sectionId", "title")
      .sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Video
router.get("/get/:videoId", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId).populate("courseId");
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

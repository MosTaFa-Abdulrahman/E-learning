const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const courseRoute = require("./routes/course");
const sectionRoute = require("./routes/section");
const videoRoute = require("./routes/video");
const quizRoute = require("./routes/quiz");

// Express Usages
dotenv.config();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Database Config
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Work 😍"))
  .catch((err) => console.log(`Error ${err.message}`));

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.get("*", (req, res, next) => {
//   return res.sendFile(
//     path.join(__dirname, "..", "client", "build", "index.html")
//   );
// });

// MiddleWares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/section", sectionRoute);
app.use("/api/video", videoRoute);
app.use("/api/quiz", quizRoute);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT} 🥰`));

/*
  1- User (OK)
  2- Section (OK)
  3- Course (OK)
  4- Video (OK)
  5- Quiz (OK)

*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // allows cross-origin requests
const jwt = require("jsonwebtoken");
const multer = require("multer"); // middleware for handling file uploads
const fs = require("fs");
const path = require("path");
const mongoDBConnectionString = "mongodb+srv://srishtiparulekar430:srishtiparulekar430@skillsetgocluster.tttbg.mongodb.net/?retryWrites=true&w=majority&appName=SkillSetGoCluster"

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const UserActivitySchema = new mongoose.Schema({
//   activity: String,
//   timestamp: Date,
// });

// app.get("/api/userActivity", async (req, res) => {
//   try {
//     const activities = await UserActivitySchema.find();
//     res.json(activities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// schemas

// job application schema
const JobApplicationSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const SuccessfulHireSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const CandidateDistributionSchema = new mongoose.Schema({
  stage: String,
  count: Number,
});

// user profile schema
const UserProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now },
  title: String,
  department: String,
  experienceLevel: String,
  specialization: String,
});

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  appliedPosition: { type: String, required: true },
  status: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  specialization: { type: String, required: true },
  profilePicture: { type: String, required: true },
});

// models
const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
const SuccessfulHire = mongoose.model("SuccessfulHire", SuccessfulHireSchema);
const CandidateDistribution = mongoose.model(
  "CandidateDistribution",
  CandidateDistributionSchema
);
const UserProfile = mongoose.model("UserProfile", UserProfileSchema); // user model
const Applicant = mongoose.model("Applicant", ApplicantSchema);

// template endpoints (to fetch data and handle uploads)
app.get("/job-applications", async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/successful-hires", async (req, res) => {
  try {
    const hires = await SuccessfulHire.find();
    res.json(hires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/candidate-distribution", async (req, res) => {
  try {
    const distribution = await CandidateDistribution.find();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// profile endpoint backend code
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};

// profile endpoint
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(res.userId);
    if (!userProfile) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a post request at /upload (where the server listens)
app.post(
  "/upload",
  authenticateToken, // uses authenticateToken middleware to ensure that the user is authenticated
  upload.single("files"), // process the uploaded file
  async (req, res) => {
    try {
      const fileUrl = `/uploads/${req.file.filename}`; // constructed url for the uploaded file

      await UserProfile.findByIdAndUpdate(req.userId, { avatarUrl: fileUrl }); // update the user's profile with the new avatar URL after uploading the file

      res.json({ id: req.userId, url: fileUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

app.get("/applicant", async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/candidates/:id", (req, res) => {
  const candidateId = req.params.id;
  const { interviewDateTime, status } = req.body;

  database
    .updateCandidate(candidateId, { interviewDateTime, status })
    .then(() =>
      res.status(200).send({ message: "Interview updated successfully" })
    )
    .catch((error) =>
      res.status(500).send({ error: "Error updating interview" })
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

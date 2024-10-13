const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongoDBConnectionString", {
  useNewUrlParser: true,
  useUnifiedTopolgy: true,
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

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
const SuccessfulHire = mongoose.model("SuccessfulHire", SuccessfulHireSchema);
const CandidateDistribution = mongoose.model(
  "CandidateDistribution",
  CandidateDistributionSchema
);

// template endpoints
app.get("/api/job-applications", async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/successful-hires", async (req, res) => {
  try {
    const hires = await SuccessfulHire.find();
    res.json(hires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/candidate-distribution", async (req, res) => {
  try {
    const distribution = await CandidateDistribution.find();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

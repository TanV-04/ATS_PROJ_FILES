import React, { useEffect, useState } from "react";
import "../home/home.css";
import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";

const Home = () => {
  const [jobApplicationsData, setJobApplicationsData] = useState([]);
  const [successfulHiresData, setSuccessfulHiresData] = useState([]);
  const [candidateDistributionData, setCandidateDistributionData] = useState(
    []
  );

  // Set the name of the page in the browser
  // useEffect(() => {
  //   document.title = "Home - Hiring Manager";
  //   fetchJobApplicationsData();
  //   fetchSuccessfulHiresData();
  //   fetchCandidateDistributionData();
  // }, []);

  const fetchJobApplicationsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/job-applications"
      );
      const data = await response.json();
      setJobApplicationsData(data);
    } catch (error) {
      console.log("error fetching job application data", error);
    }
  };

  const fetchSuccessfulHiresData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/successful-hires"
      );
      const data = await response.json();
      setSuccessfulHiresData(data);
    } catch (error) {
      console.log("error fetching successful hires data: ", error);
    }
  };

  const fetchCandidateDistributionData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/candidate-distribution"
      );
      const data = await response.json();
      setCandidateDistributionData(data);
    } catch (error) {
      console.log("error fetching candidate distribution data: ", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
        Home
      </h1>
      <div className="home">
        <div className="box box1 m">
          <TopBox />
          <h2 className="text-2xl font-bold mb-4 text-left text-primary">
            Total Applications
          </h2>
          <ul className="list-disc list-inside">
            {/* Display the total applications data if available */}
            {jobApplicationsData.length > 0 ? (
              jobApplicationsData.map((application, index) => (
                <li key={index}>
                  {application.name} - {application.count}
                </li>
              ))
            ) : (
              <li>No applications data available.</li>
            )}
          </ul>
        </div>

        {/* Job Applications Chart */}
        <div className="box box2">
          <ChartBox title="Job Applications" data={jobApplicationsData} />
        </div>

        {/* Successful Hires Chart */}
        <div className="box box3">
          <ChartBox title="Successful Hires" data={successfulHiresData} />
        </div>

        {/* Candidate Distribution Chart */}
        <div className="box box4">
          <ChartBox
            title="Candidate Distribution in Recruitment Stages"
            data={candidateDistributionData}
          />
        </div>

        <FloatingActionButton text="Post Job Opening" />
      </div>
    </>
  );
};

export default Home;

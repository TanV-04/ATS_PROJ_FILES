import { React, useEffect, useState } from "react";
import axios from "axios";
import { countriesData } from "../../../countriesData";
import { departmentsData } from "../../../departmentsData";
import "../modal/modal.css";
import { jobOpeningsData } from "../../../jobOpeningsData";

export const Modal = ({ closeModal, jobData }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [qualifications, setQualifications] = useState([""]);
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");
  // const [currentQualification, setCurrentQualification] = useState("");

  const salaryRanges = [
    "Select a salary range",
    "$30,000 - $40,000",
    "$40,000 - $50,000",
    "$50,000 - $60,000",
    "$60,000 - $70,000",
    "$70,000 - $80,000",
    "$80,000 - $90,000",
    "$90,000 - $100,000",
    "$100,000+",
  ];

  useEffect(() => {
    if (jobData) {
      setJobTitle(jobData.title);
      setJobDescription(jobData.description);
      setQualifications(jobData.qualifications || [""]);
      setLocation(jobData.location);
      setDepartment(jobData.department);
      setSelectedRole(jobData.role);
      setDeadline(jobData.applicationDeadline);
      setSalary(jobData.salary);
    }
  }, [jobData]);

  const submitjob = async () => {
    if (
      !jobTitle ||
      !jobDescription ||
      !location ||
      !department ||
      !selectedRole ||
      !deadline ||
      salary === "Select a salary range" ||
      qualifications.some((q) => !q)
    ) {
      setError(
        "Please fill in all fields and ensure there are no empty qualifications."
      );
      return;
    }

    const jobData = {
      title: jobTitle,
      location,
      salary,
      description: jobDescription,
      qualifications: qualifications.filter((q) => q),
      role: selectedRole,
      applicationDeadline: deadline,
    };

    const departmentIndex = jobOpeningsData.findIndex(
      (dept) => dept.department === department
    );

    if (departmentIndex !== -1) {
      jobOpeningsData[departmentIndex].openings.push(jobData);
    }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:5000/job-postings",
    //     jobData
    //   );
    //   if (response.status === 201) {
    //     console.log("job posting successfully added", response.data);
    //     alert("job posting added successfully");
    //   } else {
    //     console.error("error adding job posting", response.error);
    //     alert("failed to add job posting");
    //   }
    // } catch (error) {
    //   console.error("error while submitting job data to the backend: ", error);
    //   alert("an error occurred while submitting the job posting");
    // }

    closeModal(false);
  };

  // const handleSubmit = async (jobData) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/job-postings",
  //       jobData
  //     );
  //     if (response.status === 201) {
  //       console.log("job posting successfully added", response.data);
  //       alert("job posting added successfully");
  //     } else {
  //       console.error("error adding job posting", response.error);
  //       alert("failed to add job posting");
  //     }
  //   } catch (error) {
  //     console.error("error while submitting job data to the backend: ", error);
  //     alert("an error occurred while submitting the job posting");
  //   }
  // };

  const handleInputChange = () => {
    setError("");
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);

    const deptData = departmentsData.find(
      (dept) => dept.department === selectedDept
    );
    setRoles(deptData ? deptData.roles : []);
    setSelectedRole("");
  };
  const addQualification = () => {
    setQualifications([...qualifications, ""]);
  };

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);
  };

  const removeQualification = (index) => {
    if (qualifications.length === 1) {
      return;
    }

    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseButton">
          <button onClick={() => closeModal(false)}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="title">
          <h1>Post a Job Opening</h1>
        </div>
        {error && (
          <div className="error text-red-700 mb-4 text-center">{error}</div>
        )}
        <form>
          <div className="formGroup">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
                handleInputChange();
              }}
            />
          </div>

          <div className="formGroup">
            <label>Job Description</label>
            <textarea
              placeholder="Enter Job Description"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                handleInputChange();
              }}
            ></textarea>
          </div>

          <div className="formGroup">
            <label>Qualifications</label>
            {qualifications.map((qualification, index) => (
              <div key={index} className="qualificationInput mt-3">
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => {
                    handleQualificationChange(index, e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Enter Qualification"
                />
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="text-red-500 ml-2"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addQualification}
              className="text-black bg-slate-500 rounded-md p-3 mt-2 hover:bg-slate-900 hover:text-white"
            >
              Add Qualification
            </button>
          </div>

          <div className="formGroup">
            <label>Location</label>
            <select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                handleInputChange();
              }}
            >
              <option value="">Select a country</option>
              {countriesData.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Department</label>
            <select
              className="text-black"
              value={department}
              onChange={(e) => {
                handleDepartmentChange(e);
                handleInputChange();
              }}
            >
              <option value="">Select a department</option>
              {departmentsData.map((dept) => (
                <option key={dept.id} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          </div>

          {roles.length > 0 && (
            <div className="formGroup">
              <label>Role</label>
              <select
                className="text-black"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  handleInputChange();
                }}
              >
                <option value="">Select a role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="formGroup">
            <label>Application Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                handleInputChange();
              }}
            />
          </div>

          <div>
            <label className="mr-5">Salary</label>
            <select
              className="text-black p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                handleInputChange();
              }}
            >
              {salaryRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="footer">
          <button
            className="rounded-md p-4"
            onClick={() => closeModal(false)}
            id="cancelButton"
          >
            Cancel
          </button>

          <button
            className="rounded-md p-4 bg-cyan-700 hover:bg-cyan-800"
            onClick={submitjob}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// name of the collection can be jobPostings.
// each document would represent a single job posting, with data
// such as job title, JD, qualifications, location, dept, role, deadline

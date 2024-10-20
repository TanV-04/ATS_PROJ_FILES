import { React, useEffect, useState } from "react";
import "../applicantOverview/applicantOverview.css";
import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
import randomUserData from "../../../randomUserData";
import axios from "axios";
import ListPage from "../../components/searchbar/ListPage";
import SearchBar from "../../components/searchbar/SearchBar";

const ApplicantOverview = () => {
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data from the backend (make api calls using axios)
  // useEffect(() => {
  //   const fetchApplicants = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/applicants");
  //       setPosts(response.data);
  //       setSearchItem(response.data);
  //     } catch (error) {
  //       console.log("Error fetching applicants: ", error);
  //     }
  //   };
  //   fetchApplicants();
  // }, []);

  useEffect(() => {
    setPosts(randomUserData);
    setSearchItem(randomUserData);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filteredPosts = posts.filter(
      (applicant) =>
        applicant.appliedPosition &&
        applicant.appliedPosition.toLowerCase().includes(term.toLowerCase())
    );
    setSearchItem(filteredPosts);
  };

  // fragments in react are a way to group multiple elements without adding extra nodes to the DOM
  // are useful when you need to group a list of children or components without affecting their layout or styles

  return (
    <>
      {/* <Navbar showSearchIcon={true} /> */}
      <div className="applicantOverviewContainer">
        <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
          Applicant Overview
        </h1>
        <h2 className="text-lg text-center text-white lg:text-lg mb-6">
          Filter based on Applied Positions
        </h2>

        <SearchBar
          handleSearch={handleSearch}
          posts={posts}
          setSearchItem={setSearchItem}
          searchIcon={<i className="fa-solid fa-magnifying-glass" />}
        />
        <ListPage searchResults={searchItem} searchTerm={searchTerm} />

        <ul className="applicantList">
          {searchItem.map(
            (
              applicant //           {/* {filteredPosts.map((applicant) => ( // map over the applicants array */}
            ) => (
              <li className="applicantCard" key={applicant.id}>
                <div className="profilePictureContainer">
                  <img
                    src={applicant.profilePicture}
                    alt={`${applicant.name}'s Profile`}
                    className="profilePicture"
                  />
                </div>
                <div className="applicantInfo">
                  <strong>Name:</strong> {applicant.name}
                </div>
                <div className="applicantInfo">
                  <strong>Email:</strong> {applicant.email}
                </div>
                <div className="applicantInfo">
                  <strong>Phone:</strong> {applicant.phone}
                </div>
                <div className="applicantInfo">
                  <a href={applicant.resume}>Resume</a>
                </div>
                <div className="applicantInfo">
                  <strong>Applied Position:</strong> {applicant.appliedPosition}
                </div>
                <div className="applicantInfo">
                  <strong>Status:</strong> {applicant.status}
                </div>
                <div className="applicantInfo">
                  <strong>Application Date:</strong> {applicant.applicationDate}
                </div>
                <div className="applicantInfo">
                  <strong>Specialization:</strong> {applicant.specialization}
                </div>
              </li>
            )
          )}
        </ul>
        <FloatingActionButton text="Post Job Opening" />
      </div>
    </>
  );
};

export default ApplicantOverview;

// application status

// Interview Scheduled - The applicant has been scheduled for an interview.
// Application Reviewed - The application has been reviewed by the hiring team.
// Rejected - The applicant's application was not successful.
// Offer Extended - The applicant has been offered a position.
// Application Under Review - The application is currently being evaluated.

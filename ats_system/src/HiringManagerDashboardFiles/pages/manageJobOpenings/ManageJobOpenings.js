import React, { useEffect, useState } from "react";
import { jobOpeningsData } from "../../../jobOpeningsData";
import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
import axios from "axios";
import { Modal } from "../../components/modal/Modal"; // Adjust import based on your file structure
const ManageJobOpenings = ({ showSearchIcon }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(
    jobOpeningsData.flatMap((department) => department.openings)
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold the job to edit
  const [deletedItems, setDeletedItems] = useState([]);

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(
        selectedFilters.filter((el) => el !== selectedCategory)
      );
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      const tempItems = jobOpeningsData.flatMap((department) =>
        department.openings.filter((item) =>
          selectedFilters.includes(department.department)
        )
      );
      setFilteredItems(tempItems);
    } else {
      setFilteredItems(
        jobOpeningsData.flatMap((department) => department.openings)
        //fetchJobOpenings();
      );
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    //fetchJobOpenings();
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filters = jobOpeningsData.map((department) => department.department);

  const clickEditButton = (job) => {
    setSelectedJob(job); // Set the selected job data
    setOpenModal(true);
  };

  const clickDeleteButton = (job) => {
    setDeletedItems([...deletedItems, job]);
    setFilteredItems(filteredItems.filter((item) => item.id !== job.id));
  };

  // const clickDeleteButton = async (job) => {
  //   setDeletedItems([...deletedItems, job]);
  //   setFilteredItems(filteredItems.filter((item) => item.id !== job.id));
  //   try {
  //     await axios.delete(`/jobs/${job.id}`);
  //     setDeletedItems([...deletedItems, job]);
  //     setFilteredItems(filteredItems.filter((item) => item.id!==job.id));
  //   } catch(error) {
  //     console.error("error deleting data: ", error);
  //   }
  // };

  // const fetchJobOpenings = async () => {
  //   try {
  //     const response = await axios.get("/jobOpenings");
  //     const jobOpeningsData = response.data;
  //     setFilteredItems(jobOpeningsData);
  //   } catch (error) {
  //     console.error("error fetching data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchJobOpenings();
  // }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
        Manage Job Openings
      </h1>
      <h2 className="text-lg text-center text-white lg:text-lg mb-6">
        Select filter based on the Departments
      </h2>

      <div>
        <div className="buttonsContainer flex flex-wrap justify-center mb-6 space-x-4">
          {filters.map((category, idx) => (
            <button
              onClick={() => handleFilterButtonClick(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 
                ${
                  selectedFilters.includes(category)
                    ? "bg-blue-800"
                    : "bg-blue-500"
                }
                hover:bg-blue-700 mb-2`}
              key={`filters-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>
        <div className="itemsContainer space-y-4">
          {filteredItems.map((item, idx) => (
            <div
              key={`items-${idx}`}
              className="item bg-gray-700 p-4 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{item.title}</p>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <p className="category text-gray-400">{item.city}, </p>
                    <p className="category text-gray-400">{item.country}</p>
                  </div>
                </div>
              </div>
              <div className="editDeleteButtonsContainer flex space-x-2">
                <button
                  className="text-white bg-blue-500 p-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 transform hover:scale-105"
                  onClick={() => clickEditButton(item)} // Pass the item to the edit function
                >
                  <i className="fa-solid fa-pencil mr-2" />
                  Edit
                </button>
                <button
                  // onClick={() => {
                  //   clickDeleteButton(item);
                  // }}
                  className="text-white bg-red-500 p-2 rounded-md transition duration-300 ease-in-out hover:bg-red-700 transform hover:scale-105"
                >
                  <i className="fa-solid fa-trash mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <FloatingActionButton text="Add new job posting" />
      </div>
      {openModal && (
        <Modal closeModal={setOpenModal} jobData={selectedJob} /> // Pass the selected job data
      )}
    </div>
  );
};

export default ManageJobOpenings;

// note:
// make sure when the user edits the data from here,
// the data sets submitted to the backend
// add functionality to the delete button

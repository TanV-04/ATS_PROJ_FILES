// import React, { useState } from "react"; // useState is a hook (conditionally render a component)
// import randomUserData from "../../../randomUserData";
// import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
// import ModalInterview from "../../components/modal_for_interview_pg/ModalInterview";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../interviewScheduling/interviewscheduling.css";
// import DateModal from "../../components/modal_date/DateModal";

// const InterviewScheduling = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [applicantId, setApplicantId] = useState(null);
//   const [scheduledInterviews, setScheduledInterviews] = useState({});
//   const [startDate, setStartDate] = useState(new Date());

//   const filteredCandidates = randomUserData.filter(
//     (candidate) =>
//       candidate.status === "Scheduled" || candidate.status === "Reviewing"
//   );

//   // to get status color (conditional styling)
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Scheduled":
//         return "bg-green-100 text-green-800";
//       case "Reviewing":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // dateTime is the object representing when the interview is scheduled
//   // const handleScheduleInterview = (id, dateTime) => {
//   //   // setScheduledInterviews is the state updater function returned by the useState hook
//   //   // it is a piece of state holding the scheduled interviews data
//   //   // the prev parameter is a function argument that represents the current state of scheduledInterviews before the update
//   //   setScheduledInterviews((prev) => ({
//   //     ...prev, // copies all the existing key-value pairs from the previous state of scheduledInterviews
//   //     [id]: dateTime, // computed property names to dynamically set of update the property in the new state object. . It means that if the property with the key id already exists, it will be updated with the new dateTime. If it doesn't exist, a new property will be added to the state with that key and value.
//   //   }));
//   // };

//   const handleScheduleInterview = (id, dateTime) => {
//     const dateKey = dateTime.toISOString().split("T")[0]; // Get the date string in YYYY-MM-DD format
//     const candidateData = {
//       id,
//       name: randomUserData.find((candidate) => candidate.id === id)?.name,
//       time: dateTime.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setScheduledInterviews((prev) => ({
//       ...prev,
//       [dateKey]: prev[dateKey]
//         ? [...prev[dateKey], candidateData]
//         : [candidateData],
//     }));
//   };

//   const isDateScheduled = (date) => {
//     const dateKey = date.toISOString().split("T")[0];
//     return scheduledInterviews[dateKey]?.length > 0;
//   };

//   // backend code (fetch candidates from the backend when the component mounts)

//   // useEffect(() => {
//   //   const fetchCandidates = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "http://localhost:5000/candidateScheduling"
//   //       );
//   //       setCandidates(response.data);
//   //     } catch (error) {
//   //       console.error("error fetching candidates: ", error);
//   //     }
//   //   };
//   //   fetchCandidates();
//   // }, []);

//   // const handleScheduleInterview = async (applicantId, scheduledDateTime) => {
//   //   try {

//   //     await axios.put(`http://localhost:5000/candidateScheduling/${applicantId}`, {
//   //       interviewDateTime: scheduledDateTime.toString(),
//   //       status: "Scheduled",
//   //     });
//   //     // Optionally refetch candidates or update state directly
//   //     setCandidates((prev) =>
//   //       prev.map((candidate) =>
//   //         candidate.id === applicantId
//   //           ? {
//   //               ...candidate,
//   //               interviewDateTime: scheduledDateTime.toString(),
//   //               status: "Scheduled",
//   //             }
//   //           : candidate
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error scheduling interview:", error);
//   //   }
//   // };

//   return (
//     <>
//       <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
//         Schedule Interviews
//       </h1>

//       <div className="schedule-container flex flex-wrap lg:flex-nowrap justify-between">
//         <div className="candidatesContainer flex-1 bg-gray-100 p-4 rounded-lg mr-4">
//           <h2 className="text-2xl font-bold mb-4 text-black">Candidates</h2>
//           {filteredCandidates.map((candidate) => (
//             <div
//               key={candidate.id}
//               className={`candidate-card ${getStatusColor(
//                 candidate.status
//               )} p-4 m-2 rounded shadow-lg`}
//             >
//               <img
//                 src={candidate.profilePicture}
//                 alt={candidate.name}
//                 className="profile-picture w-16 h-16 rounded-full mb-4"
//               />
//               <h2 className="text-xl font-semibold text-black mb-2">
//                 {candidate.name}
//               </h2>
//               <p className="text-gray-600 mb-2">
//                 <strong>Position</strong>: {candidate.appliedPosition}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Specialization</strong>: {candidate.specialization}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Status</strong>: {candidate.status}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Application Date</strong>: {candidate.applicationDate}
//               </p>

//               <p className="text-gray-600 mb-2">
//                 <strong>Scheduled Interview</strong>:
//                 {scheduledInterviews[candidate.id]
//                   ? scheduledInterviews[candidate.id].toLocaleString()
//                   : "Not Scheduled"}
//               </p>

//               <a
//                 href={candidate.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 underline"
//               >
//                 View Resume
//               </a>
//               {/* <div className="submitScheduleButtonContainer mt-4 flex justify-between">
//                 <button className="submitButton bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                   Submit
//                 </button>
//                 <button className="scheduleButton bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//                   Schedule
//                 </button>
//               </div> */}
//               <div className="mt-4 flex justify-end items-center">
//                 <button
//                   onClick={() => {
//                     setApplicantId(candidate.id);
//                     setOpenModal(true);
//                   }}
//                   className="submitButton bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   <i class="fa-solid fa-pencil mr-2" />
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         {openModal && (
//           <ModalInterview
//             closeModal={setOpenModal}
//             applicantId={applicantId}
//             onScheduleInterview={handleScheduleInterview}
//             scheduledTime={
//               scheduledInterviews[applicantId]?.time
//                 ? new Date(scheduledInterviews[applicantId].time)
//                 : null
//             }
//           />
//         )}
//         {/* Calendar Section */}
//         <div
//           className="calendarContainer flex-1 bg-gray-100 p-4 rounded-lg ml-4 text-black"
//           style={{ height: "50%" }}
//         >
//           <h2 className="text-2xl font-bold mb-4">Calendar</h2>
//           {/* Calendar component goes here */}
//           <div className="pickerContainer">
//             <div className="dateWrapper">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 dateFormat="yyyy/MM/dd"
//                 minDate={new Date()}
//                 maxDate={new Date().setMonth(new Date().getMonth() + 1)}
//                 inline
//                 dayClassName={(date) =>
//                   isDateScheduled(date) ? "highlighted-date" : undefined
//                 }
//               />
//             </div>
//           </div>
//           {/* <DateModal /> */}
//           {<DateModal />}
//         </div>
//       </div>

//       <FloatingActionButton text="Post Job Opening" />
//     </>
//   );
// };

// export default InterviewScheduling;

import React, { useEffect, useState } from "react";
import randomUserData from "../../../randomUserData";
import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
import ModalInterview from "../../components/modal_for_interview_pg/ModalInterview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../interviewScheduling/interviewscheduling.css";
import DateModal from "../../components/modal_date/DateModal";
import { jobOpeningsData } from "../../../jobOpeningsData";

const InterviewScheduling = () => {
  const [candidates, setCandidates] = useState(randomUserData);
  const [openModal, setOpenModal] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [scheduledInterviews, setScheduledInterviews] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // add a state for the selected date to be passed into the DateModal
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredCandidate, setFilteredCandidate] = useState(candidates);

  useEffect(() => {
    filterCandidates();
  }, [candidates, selectedFilters]);

  const handleFilterButtonClick = (selectedStatus) => {
    setSelectedFilters((prev) =>
      prev.includes(selectedStatus)
        ? prev.filter((status) => status !== selectedStatus)
        : [...prev, selectedStatus]
    );
  };

  const filterCandidates = () => {
    if (selectedFilters.length > 0) {
      const filtered = candidates.filter((candidate) =>
        selectedFilters.includes(candidate.status)
      );
      setFilteredCandidate(filtered);
    } else {
      setFilteredCandidate(candidates);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setFilteredCandidate(candidates);
  };

  const filters = ["Scheduled", "Reviewing", "Offered", "Rejected"];

  // Filter candidates to only those with relevant statuses
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.status === "Scheduled" || candidate.status === "Reviewing"
  );

  const interviewsForSelectedDate =
    selectedDate &&
    scheduledInterviews[selectedDate.toLocaleDateString("en-CA")]
      ? scheduledInterviews[selectedDate.toLocaleDateString("en-CA")]
      : [];

  // Get the appropriate color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-green-100 text-green-800";
      case "Reviewing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Update scheduled interviews when an interview is scheduled
  const handleScheduleInterview = (id, dateTime) => {
    const dateKey = dateTime.toLocaleDateString("en-CA");

    // Update the candidate data in the state
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              interviewDateTime: dateTime.toString(),
              status: "Scheduled",
            }
          : candidate
      )
    );

    // Store scheduled interviews in a date-based format
    const candidateData = {
      id,
      name: randomUserData.find((candidate) => candidate.id === id)?.name,
      time: dateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setScheduledInterviews((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey]
        ? [...prev[dateKey], candidateData]
        : [candidateData],
    }));

    // send data to backend (make function async)
    // try {
    //   const response = await axios.put(
    //     `http://localhost:5000/candidates/${id}`,
    //     {
    //       interviewDateTime: dateTime.toString(),
    //       status: "Scheduled",
    //     }
    //   );
    //   console.log("interview scheduled successfully");
    // } catch (error) {
    //   console.error("error in scheduling: ", error);
    // }
  };

  // Check if a date has scheduled interviews by highlighting them for a particular dateKey
  const isDateScheduled = (dateTime) => {
    const dateKey = dateTime.toLocaleDateString("en-CA");
    return scheduledInterviews[dateKey]?.length > 0;
  };

  // function to handle date click to open DateModal
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDateModal(true);
  };

  const closeDateModal = () => {
    setShowDateModal(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
        Schedule Interviews
      </h1>

      <div className="schedule-container flex flex-wrap lg:flex-nowrap justify-between">
        <div className="candidatesContainer flex-1 bg-gray-100 p-4 rounded-lg mr-4">
          <h2 className="text-2xl font-bold mb-4 text-black">Candidates</h2>
          <h3 className="text-lg font-bold mb-4 text-gray-500">
            Filter Candidates on Department
          </h3>
{/* 
          <div className="buttonsContainer">
            {filters.map((status, idx) => (
              <button
                onClick={() => handleFilterButtonClick(status)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 
                ${
                  selectedFilters.includes(status)
                    ? "bg-blue-800"
                    : "bg-blue-500"
                }
                hover:bg-blue-700 mb-2`}
                key={`filters-${idx}`}
              >
                {status}
              </button>
            ))}
          </div> */}
          <div className="flex justify-center mb-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`candidate-card ${getStatusColor(
                candidate.status
              )} p-4 m-2 rounded shadow-lg`}
            >
              <img
                src={candidate.profilePicture}
                alt={candidate.name}
                className="profile-picture w-16 h-16 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-black mb-2">
                {candidate.name}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Position</strong>: {candidate.appliedPosition}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Specialization</strong>: {candidate.specialization}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Status</strong>: {candidate.status}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Application Date</strong>: {candidate.applicationDate}
              </p>

              <p className="text-gray-600 mb-2">
                <strong>Scheduled Interview</strong>:
                {candidate.interviewDateTime
                  ? new Date(candidate.interviewDateTime).toLocaleString()
                  : "Not Scheduled"}
              </p>

              <a
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>

              <div className="mt-4 flex justify-end items-center">
                <button
                  onClick={() => {
                    setApplicantId(candidate.id);
                    setOpenModal(true);
                  }}
                  className="submitButton bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  <i className="fa-solid fa-pencil mr-2" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {openModal && (
          <ModalInterview
            closeModal={setOpenModal}
            applicantId={applicantId}
            onScheduleInterview={handleScheduleInterview}
            scheduledTime={
              candidates.find((candidate) => candidate.id === applicantId)
                ?.interviewDateTime
                ? new Date(
                    candidates.find(
                      (candidate) => candidate.id === applicantId
                    ).interviewDateTime
                  )
                : null
            }
          />
        )}

        <div
          className="calendarContainer flex-1 bg-gray-100 p-4 rounded-lg ml-4 text-black"
          style={{ height: "50%" }}
        >
          <h2 className="text-2xl font-bold mb-4">Calendar</h2>
          <div className="pickerContainer">
            <div className="dateWrapper">
              <DatePicker
                // onClick={(date) => handleDateClick(date)}
                selected={startDate}
                onChange={(date) => {
                  handleDateClick(date);
                  setStartDate(date);
                  setSelectedDate(date); // update the selected date state
                }}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                maxDate={new Date("2029-12-31")} // set max date till 2029
                inline
                dayClassName={
                  (date) =>
                    isDateScheduled(date) ? "highlighted-date" : undefined // isDateScheduled is a function that checks the scheduledInterviews state to see if any interviews are scheduled for that date
                }
              />
            </div>
          </div>
          {showDateModal && (
            <DateModal
              closeModal={closeDateModal}
              selectedDate={selectedDate}
              interviews={interviewsForSelectedDate}
            />
          )}
        </div>
      </div>

      <FloatingActionButton text="Post Job Opening" />
    </>
  );
};

export default InterviewScheduling;

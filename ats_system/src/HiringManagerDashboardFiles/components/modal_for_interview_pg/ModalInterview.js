import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // default datepicker styling
import TimePicker from "react-time-picker"; // timepicker styling
import "react-time-picker/dist/TimePicker.css"; // timepicker styling
import "react-clock/dist/Clock.css";
import randomUserData from "../../../randomUserData";

const ModalInterview = ({ closeModal, applicantId, onScheduleInterview, scheduledTime }) => {
  const [startDate, setStartDate] = useState(
    scheduledTime ? new Date(scheduledTime) : null
  );
  const [time, setTime] = useState(
    scheduledTime
      ? scheduledTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "10:00"
  );

  const onChange = (value) => {
    setTime(value);
  };

  // const scheduleInterview = () => {
  //   if (startDate) {
  //     const scheduledDateTime = new Date(startDate);
  //     const [hours, minutes] = time.split(":");
  //     const isPM = time.includes("PM");

  //     scheduledDateTime.setHours(
  //       isPM ? parseInt(hours) + 12 : parseInt(hours),
  //       parseInt(minutes)
  //     );

  //     const updatedUserData = randomUserData.map((applicant) => {
  //       if (applicant.id === applicantId) {
  //         return {
  //           ...applicant,
  //           interviewDateTime: scheduledDateTime.toString(),
  //           status: "Scheduled",
  //         };
  //       }
  //       return applicant;
  //     });
  //     console.log("updated user data: ", updatedUserData);
  //     closeModal(false);
  //   } else {
  //     alert("please select a date");
  //   }
  // };

  const scheduleInterview = () => {
    // startDate is a state variable
    if (startDate) {
      // check if the date has been selected by the user, if not alert the user
      const scheduledDateTime = new Date(startDate); // a new date object is created based on the selected startDate
      const [hours, minutes] = time.split(":"); // the time string is split into two parts, hours and minutes
      const isPM = time.includes("PM"); // if the selecte time contains "PM", it sets isPM (boolean) to true or false based on this check

      // if isPM is true, it converts the hour to a 24-hr format by adding 12 to the hour
      // if isPM is false, it uses hour as it is (1 am remains 1)
      // parseInt is used to convert the hour and minute strings to integers
      scheduledDateTime.setHours(
        isPM ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes)
      );

      // Call the function passed from the parent to schedule the interview
      onScheduleInterview(applicantId, scheduledDateTime);
      closeModal(false); // close the modal after scheduling the interview (update the state to close the modal)
    } else {
      alert("please select a date");
    }
  };

  return (
    <div className="modalBackground ">
      <div className="modalContainer">
        <div className="titleCloseButton">
          <button onClick={() => closeModal(false)}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="title">
          <h1>Schedule Interview</h1>
        </div>
        <div className="body">
          <div className="pickerContainer">
            <div className="datePickerWrapper flex-grow max-w-[250px]">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                maxDate={new Date('2029-12-31')}
                inline
              />
            </div>
            <div className="timePickerWrapper flex-grow max-w-[120px] flex items-center justify-center">
              <TimePicker onChange={onChange} value={time} format="hh:mm a" />
            </div>
          </div>
        </div>

        <div className="footer">
          <button className="cancelButton" onClick={() => closeModal(false)}>
            Cancel
          </button>
          <button onClick={scheduleInterview} className="scheduleButton">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInterview;

// divide the page into two parts.
// left side will be all the candidates/applicants
// on clicking one candidate, open modal where the mgr can edit applicant's status (and this status will be sent real time to the user) and another button to schedule interview
// on clicking the schedule interview button, modal opens containing info like name, email, appliedPosition, status (optional)
// include a date picker to choose the interview date, a time picker to choose the interview time, notes/comment section for info related to the interview
// add buttons in the modal to schedule or cancel (make sure the interview gets scheduled in the calender.)
// the search functionality for this can filter applicants on appliedPosition, status, applied date

// the right side will be the calender, where it'll be highlighted for the mgr
// whether there are any interviews scheduled or not, in blue
// when a day is clicked, a modal opens, and the mgr can see a list of applicant's names, and timings of interview

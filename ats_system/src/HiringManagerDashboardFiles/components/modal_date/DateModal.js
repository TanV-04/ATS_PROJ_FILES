import React from "react";

const DateModal = ({ selectedDate, interviews, closeModal }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseButton">        <button onClick={closeModal}>
          <i className="fa-solid fa-xmark" />
        </button></div>
        <div className="title">
          <h1>
            Scheduled Interviews on{" "}
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : "No Date Selected"}
          </h1>
        </div>
        <div className="body">
          {interviews.length > 0 ? (
            <ul>
              {interviews.map((interview, index) => (
                <li key={index}>
                  <strong>{interview.name}</strong> - {interview.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>no interviews scheduled today</p>
          )}
        </div>
        <div className="footer">
          <button className="bg-red-500 rounded-md p-4 hover:bg-red-600" onClick={closeModal}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;

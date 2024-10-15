// FAB.js
import { React, useState } from "react";
import "./fab.css"; // Import CSS for styling
import { Modal } from "../modal/Modal";

const FloatingActionButton = ({ onClick, text }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button className="fab" onClick={() => setOpenModal(true)}>
        <span className="tooltip">{text}</span> +
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
    </>
  );
};

export default FloatingActionButton;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./uploadAvatar.css"; // Ensure styles are imported
import { toast } from "react-toastify";
const UploadAvatar = ({
  userId,
  token,
  username,
  avatarUrl,
  setIsUserUpdated,
  closeModal,
}) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem(`avatarUrl_${userId}`);
    if (storedAvatarUrl) {
      setFile(storedAvatarUrl);
    }
  }, [userId]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];
      if (type === "image/png" || type === "image/jpeg") {
        setFile(files[0]);
        setError("");
      } else {
        setError("Only PNG and JPEG images are allowed.");
        toast.error("Only PNG and JPEG images are allowed.", {
          hideProgressBar: true,
        });
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    // client-side operation that iteracts with the server
    // front-end interacts with the backend using this code
    // thru end-points defined in the Express.js code
    try {
      // uses axios.put() to send a request to the server
      // targets a specifc endpoint
      const response = await axios.put(
        `http://localhost:5000/avatarId/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const { url } = response.data;
        localStorage.setItem(`avatarUrl_${userId}`, url);
        setIsUserUpdated(true);
        toast.success("Avatar uploaded successfully!");
        setError("");
        setModal(false);
      }
    } catch (error) {
      console.error({ error });
      setError("Failed to upload avatar.");
      toast.error("Failed to upload avatar.");
    }
  };

  // const handleCancel = () => {
  //   localStorage.removeItem(`avatarUrl_${userId}`);
  //   setFile(null);
  //   setModal(false);
  // };

  return (
    // <div className="modalBackground">
    <div className="modalBackground">
      {/* <h1
          className="p-4 text-center font-bold"
          onClick={() => closeModal(false)}
        >
          {`${avatarUrl ? "Change" : "Upload"} picture`}
        </h1> */}
      <div className="modalContainer">
        <h1 className="p-4 text-center font-bold" toggle={toggle}>
          {`${avatarUrl ? "Change" : "Upload"} Your Avatar`}
        </h1>

        <form>
          <div className="formGroup">
            <label for="exampleFile">Select Image</label>
            <input
              type="file"
              name="file"
              id="exampleFile"
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg"
            />
          </div>
        </form>

        <footer className="footer">
          {error && <span className="error-message p-3 text-red-700 text-center">{error}</span>}
          <button
            className="rounded-md p-4 bg-blue-500 hover:bg-blue-600"
            onClick={handleUpload}
          >
            Upload
          </button>
          <button
            className="rounded-md p-4 bg-red-500 hover:bg-red-600"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
    // </div>
  );
};

export default UploadAvatar;

// the client initates a request to the server to upload a file and handle the response
// server handles the backend logic for accepting file uploads and updaating user profiles

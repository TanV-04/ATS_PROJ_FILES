import React, { useState, useEffect } from "react";
import axios from "axios";
import "./uploadFileModal.css"; // Ensure styles are imported
import { toast } from "react-toastify";

const UploadFileModal = ({
  userId,
  token,
  setIsUserUpdated,
  closeModal,
  onFileUpload,
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedFileUrl = localStorage.getItem(`fileUrl_${userId}`);
    if (storedFileUrl) {
      setFile(storedFileUrl);
    }
  }, [userId]);

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const selectedFile = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please select a valid file type (PDF or DOCX).");
        return;
      }
      if (selectedFile.size > maxSize) {
        setError("File size must be less than 2MB.");
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("description", description);

    try {
      const response = await axios.put(
        `http://localhost:5000/uploadFile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const { url } = response.data; // Adjust this based on your response structure
        localStorage.setItem(`fileUrl_${userId}`, url);
        setIsUserUpdated(true);
        toast.success("File uploaded successfully!");
        setError("");
        onFileUpload(url);
        closeModal(false);
      }
    } catch (error) {
      console.error({ error });
      setError("Failed to upload file.");
      toast.error("Failed to upload file.");
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <h1 className="p-4 text-center font-bold">Upload Your File</h1>

        <form>
          <div className="formGroup">
            <label htmlFor="fileInput">Select File</label>
            <input
              type="file"
              name="file"
              id="fileInput"
              onChange={handleFileChange}
            />
          </div>
        </form>

        <footer className="footer">
          {error && (
            <span className="error-message p-3 text-red-700 text-center">
              {error}
            </span>
          )}
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
  );
};

export default UploadFileModal;

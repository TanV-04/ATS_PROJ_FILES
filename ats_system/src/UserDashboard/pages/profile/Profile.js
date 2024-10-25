import { React, useEffect, useState } from "react";
import axios from "axios";
import "../../../HiringManagerDashboardFiles/pages/profile/profile.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "../../../HiringManagerDashboardFiles/pages/profile/UploadAvatar";
import UploadFileModal from "./UploadFileModal";
import { MdEdit, MdSave } from "react-icons/md";

const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/profile`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.log({ error });
      }
    };

    getProfileData();
  }, [token]);

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem(`avatarUrl_${user.id}`);
    if (storedAvatarUrl) {
      setUser((prev) => ({ ...prev, avatarUrl: storedAvatarUrl }));
    }
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditable = () => {
    if (isEditable) {
      alert("Your changes have been saved.");
    }
    setIsEditable((prev) => !prev);
  };

  // callback for successful resume upload
  const handleFileUpload = (fileName) => {
    setUploadedFileName(fileName);
    setOpenModal(false); // close the modal after successful upload
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Profile
      </h1>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="avatarWrapper rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
            {user.avatarUrl ? (
              <img
                className="h-32 w-32 object-cover"
                src={`http://localhost:5000${user.avatarUrl}`}
                alt={`${user.username} avatar`}
              />
            ) : (
              <IoPersonCircleOutline className="text-gray-400 h-32 w-32" />
            )}
          </div>
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            onClick={() => setOpenModal(true)}
          >
            <MdEdit className="h-5 w-5" />
          </button>
        </div>
      </div>

      {openModal && (
        <UploadAvatar
          closeModal={setOpenModal}
          token={token}
          userId={user.id}
          username={user.username}
          avatarUrl={user.avatarUrl}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">
                <strong>Name</strong>
              </label>
              <input
                placeholder="enter your name"
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full text-black"
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-gray-600">
                <strong>Email</strong>
              </label>
              <input
                placeholder="enter your email"
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full text-black"
                readOnly={!isEditable}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">
                <strong>Phone Number</strong>
              </label>
              <input
                placeholder="enter your phone"
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full text-black"
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-gray-600">
                <strong>LinkedIn Profile</strong>
              </label>
              <input
                placeholder="enter your linkedin link"
                type="url"
                name="linkedin"
                value={user.linkedin}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full text-black"
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-gray-600">
                <strong>Personal Website (optional)</strong>
              </label>
              <input
                placeholder="enter your personal website"
                type="url"
                name="website"
                value={user.website}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full text-black"
                readOnly={!isEditable}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Upload Resume
        </button>

        {uploadedFileName && (
          <span className="text-gray-700 font-semibold">
            Uploaded: {uploadedFileName}
          </span>
        )}

        <button
          onClick={handleEditable}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
        >
          {isEditable ? (
            <>
              <button className="inline-block mr-2" /> Save
            </>
          ) : (
            <>
              <button className="inline-block mr-2" /> Edit
            </>
          )}
        </button>
      </div>

      {openModal && (
        <UploadFileModal
          userId={user.id} 
          token={token}
          closeModal={setOpenModal}
          onFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default Profile;

// The profile page of an applicant in an Applicant Tracking System (ATS) typically includes the following sections:

// 1. **Personal Information**:
//    - Full Name
//    - Contact Information (Email, Phone Number, Address)
//    - LinkedIn Profile or Personal Website (if applicable)

// 2. **Resume Upload**:
//    - Option to upload or update the resume.
//    - Preview of the current resume.

// 3. **Cover Letter**:
//    - Option to upload or input a cover letter.

// 4. **Skills**:
//    - List of relevant skills (both technical and soft skills).
//    - Option to add or remove skills.

// 5. **Work Experience**:
//    - Previous job titles, companies, and dates of employment.
//    - Description of roles and responsibilities.
//    - Option to add or edit work experience.

// 6. **Education**:
//    - Institutions attended, degrees earned, and graduation dates.
//    - Option to add or edit educational background.

// 7. **Certifications and Training**:
//    - List of relevant certifications and training programs completed.
//    - Option to add or edit certifications.

// 8. **References**:
//    - Option to provide references or mark references as available upon request.

// 9. **Profile Summary**:
//    - A brief summary or objective statement about the applicant's career goals and qualifications.

// 10. **Application History**:
//     - Overview of past applications submitted through the ATS, including status updates.

// 11. **Settings/Privacy Options**:
//     - Preferences for visibility of the profile (e.g., public vs. private).
//     - Notification settings for job alerts and application status updates.

// 12. **Save/Update Button**:
//     - Option to save changes made to the profile.

// This layout provides a comprehensive view of the applicant's professional background and allows easy management of their job application materials.

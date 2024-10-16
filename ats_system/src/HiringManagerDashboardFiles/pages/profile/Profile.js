import { React, useEffect, useState } from "react";
import FloatingActionButton from "../../components/floatingActionButton/FloatingActionButton";
import axios from "axios";
import "./profile.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "./UploadAvatar";

export const Profile = ({ token }) => {
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isHiringMgrUpdated, setIsHiringMgrUpdated] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/profile`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data);
        setIsHiringMgrUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };

    getProfileData();
  }, [token, isHiringMgrUpdated]);

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem(`avatarUrl_${user.id}`);
    if (storedAvatarUrl) {
      setUser((prev) => ({ ...prev, avatarUrl: storedAvatarUrl }));
    }
  }, [user.id]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white lg:text-4xl mb-6">
        Profile
      </h1>
      <div className="avatar">
        <div className="avatarWrapper">
          {user.avatarUrl ? (
            <img
              src={`http://localhost:5000${user.avatarUrl}`}
              alt={`${user.username} avatar`}
            />
          ) : (
            <IoPersonCircleOutline />
          )}
        </div>
      </div>
      <div className="flex justify-center lg:justify-center">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:w-auto w-full"
          onClick={() => setOpenModal(true)}
        >
          Upload image
        </button>
      </div>
      {/* <IoPersonCircleOutline /> */}
      {openModal && (
        <UploadAvatar
          closeModal={setOpenModal}
          token={token}
          userId={user.id}
          username={user.username}
          avatarUrl={user.avatarUrl}
          setIsUserUpdated={setIsHiringMgrUpdated}
        />
      )}
      <div className="profile">
        <p>
          <strong>Name</strong>: {user.username || "Harry"}
        </p>
        <p>
          <strong>Email</strong>: {user.email || "email.com"}
        </p>
        <p>
          <strong>Account Created On</strong>: {user.createdAt || "1/1/2024"}
        </p>

        <p>
          <strong>Title</strong>: {user.title || "Hiring Manager"}
        </p>
        <p>
          <strong>Department</strong>: {user.department || "Department Name"}
        </p>
        {/* <p>Experience Level: {user.experienceLevel || "Mid-Level"}</p> */}
        <p>
          <strong>Specialization</strong>:{" "}
          {user.specialization || "Technical Recruiting"}
        </p>
      </div>

      <FloatingActionButton text="Add New Job Posting" />
    </>
  );
};

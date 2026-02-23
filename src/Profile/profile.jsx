import React from "react";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, email, age, gender, about, photoURL } =
    user?.user || {};
  if (!user?.user) {
    return (
      <div className="flex items-center justify-center mt-32 font-['Poppins']">
        <p className="text-lg text-gray-500">No user data available.</p>
      </div>
    );
  }
  return (
    <UserCard
      user={{ firstName, lastName, email, age, gender, about, photoURL }}
    />
  );
};

export default Profile;

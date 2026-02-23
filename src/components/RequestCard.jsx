import { Check, X } from "lucide-react";
import React from "react";

const RequestCard = ({ user, onAccept, onReject, status = "interested" }) => {
  return (
    <div
      key={user?._id}
      className="flex w-2xl font-['Poppins'] items-center justify-between bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
    >
      {/* Left Section: Profile + Info */}
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <img
          src={
            user.photoURL ||
            "https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg?s=612x612&w=0&k=20&c=uegpkq9-EgMlLR2MjUOgYV5Ev4hftQ_X4CONfDInjE8="
          }
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
        />

        {/* Name + About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500 max-w-xs truncate">
            {user.about}
          </p>
        </div>
      </div>

      {/* Right Section: Buttons */}
      {status != "accepted" && (
        <div className="flex items-center gap-3">
          {/* Reject */}
          <button
            onClick={() => onReject(user._id)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
          >
            <X size={20} className="text-indigo-600" />
          </button>

          {/* Accept */}
          <button
            onClick={() => onAccept(user._id)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Check size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;

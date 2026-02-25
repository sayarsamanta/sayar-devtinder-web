import { Check, X } from "lucide-react";

const RequestCard = ({
  user,
  onAccept,
  onReject,
  status = "interested",
  onDelete,
}) => {
  return (
    <div
      key={user?._id}
      className="
    md:w-3xl
    lg:w-3xl
    max-w-3xl
    w-full
    mx-auto lg:mx-0
    bg-white
    shadow-md
    hover:shadow-xl
    transition-all
    duration-300
    rounded-2xl
    p-4 sm:p-5
    flex
    flex-col
    sm:flex-row
    sm:items-center
    justify-between
    gap-4
  "
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* LEFT SECTION */}
        <div className="relative">
          <img
            src={
              user.photoURL ||
              "https://media.istockphoto.com/id/1934800957/vector/man-empty-avatar-vector-photo-placeholder-for-social-networks-resumes-forums-and-dating.jpg"
            }
            alt={`${user.firstName} ${user.lastName}`}
            className="
      w-14 h-14
      sm:w-16 sm:h-16
      rounded-full
      object-cover
      border-2
      border-indigo-500
    "
          />

          {status === "accepted" && (
            <div
              className="
      absolute
      -bottom-1
      -right-1
      w-5 h-5
      sm:w-6 sm:h-6
      bg-green-500
      rounded-full
      flex items-center justify-center
      border-2 border-white
      shadow
    "
            >
              <Check size={12} className="text-white" />
            </div>
          )}
          {/* Name + About */}
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-sm text-gray-500 wrap-break-word line-clamp-2">
            {user.about || "No bio available"}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      {status === "accepted" ? (
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => onDelete(user._id)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
          >
            <X size={18} className="text-indigo-600" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Reject */}
          <button
            onClick={() => onReject(user._id)}
            className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          bg-indigo-100
          hover:bg-indigo-200
          active:scale-95
          transition
        "
          >
            <X size={20} className="text-indigo-600" />
          </button>

          {/* Accept */}
          <button
            onClick={() => onAccept(user._id)}
            className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          bg-indigo-600
          hover:bg-indigo-700
          active:scale-95
          transition
        "
          >
            <Check size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;

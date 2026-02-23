import React from "react";

const FeedCard = ({
  firstName,
  lastName,
  age,
  about,
  photoURL,
  _id,
  onInterested,
  onRejected,
  onPrev,
  onNext,
  isLast,
  isFirst,
}) => {
  return (
    <div className="flex justify-center items-start h-96 pt-28 px-4">
      <div className=" rounded-3xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 bg-[#818cf8]">
        {/* Profile Image */}
        <div className="relative h-120 w-120">
          <img
            src={
              photoURL ? photoURL : "https://picsum.photos/200/300?grayscale"
            }
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover object-center"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Name + Age */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}, {age}
            </h2>
          </div>
          {/* Action Buttons */}
          <div className="absolute bottom-2 right-4 flex">
            <button
              onClick={() => onRejected(_id)}
              className="w-14 h-14 rounded-full 
                bg-white/90 text-red-500
               flex items-center justify-center text-2xl
               hover:bg-[--color-primary]/10
               transition duration-200 shadow-lg hover:scale-110 mr-2"
            >
              ✖
            </button>

            <button
              onClick={() => onInterested(_id)}
              className="w-14 h-14 rounded-full bg-white text-fuchsia-400 text-xl flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              ♥
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="p-5">
          <p className="text-white text-sm leading-relaxed">{about}</p>

          <div className="flex justify-between items-center mt-6">
            {/* Previous */}
            <button
              onClick={onPrev}
              disabled={isFirst}
              className={`
      px-5 py-2 rounded-lg text-sm font-medium transition
      ${
        isFirst
          ? "bg-white/40 text-white cursor-not-allowed"
          : "bg-white text-(--color-primary) hover:scale-105 shadow-md"
      }
    `}
            >
              ← Previous
            </button>

            {/* Next */}
            <button
              onClick={onNext}
              disabled={isLast}
              className={`
      px-5 py-2 rounded-lg text-sm font-medium transition
      ${
        isLast
          ? "bg-white/40 text-white cursor-not-allowed"
          : "bg-white text-[var(--color-primary)] hover:scale-105 shadow-md"
      }
    `}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

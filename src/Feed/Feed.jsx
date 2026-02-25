import React, { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import useFeed from "../hook/getFeed";
import { useSelector } from "react-redux";
import useSentOrIgnored from "../hook/sentOrIgnored";

function Feed() {
  const { getFeed } = useFeed();
  const { sendOrIgnore } = useSentOrIgnored();
  const feed = useSelector((state) => state.feed.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === feed.length - 1;
  useEffect(() => {
    getFeed();
  }, []);

  const sendRequest = async (userId, status) => {
    // Implement the logic to send a connection request to the user
    await sendOrIgnore(userId, status);
  };

  const onNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentUser = feed[currentIndex];
  if (!feed || feed?.message) {
    return (
      <div className="flex justify-center items-center text-xl text-white my-6">
        No users found.
      </div>
    );
  } else if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center text-xl text-white my-6">
        No users found.
      </div>
    );
  } else {
    return (
      <FeedCard
        {...currentUser}
        key={currentUser._id}
        onInterested={sendRequest}
        onRejected={sendRequest}
        onNext={onNext}
        onPrev={onPrev}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  }
}

export default Feed;

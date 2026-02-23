import React, { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";
import useFeed from "../hook/getFeed";
import { useSelector } from "react-redux";

function Feed() {
  const { getFeed, loading, error } = useFeed();
  const feed = useSelector((state) => state.feed.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === feed.length - 1;
  useEffect(() => {
    getFeed();
  }, []);

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
  return (
    feed &&
    feed.length > 0 && (
      <FeedCard
        {...currentUser}
        key={currentUser._id}
        onInterested={() => {}}
        onRejected={() => {}}
        onNext={onNext}
        onPrev={onPrev}
        isFirst={isFirst}
        isLast={isLast}
      />
    )
  );
}

export default Feed;

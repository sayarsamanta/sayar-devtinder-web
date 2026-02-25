import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../app/slice/feedSlice";

const useSentOrIgnored = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const sendOrIgnore = async (userId, actionType) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        API_BASE_URL + "connect/" + actionType + "/" + userId,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeFromFeed(userId));
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendOrIgnore, loading, error };
};

export default useSentOrIgnored;

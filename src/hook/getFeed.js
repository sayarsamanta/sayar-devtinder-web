import { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { API_BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFeed } from "../app/slice/feedSlice"; // adjust path
const useFeed = () => {
  const [feed, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(API_BASE_URL + "/feed", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setFeedData(res?.data || []);
        dispatch(setFeed(res?.data || [])); // Update Redux store
      }
    } catch (error) {
      if (isCancel(error)) {
        setError("Request cancelled");
        showToast("Request cancelled", "error");
      } else if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          setError("Unauthorized. Please login again.");
          showToast("Unauthorized. Please login again.", "error");
          navigate("/login");
        } else {
          setError(
            error?.response?.data?.message ||
              "Failed to fetch feed. Please try again."
          );
          showToast(
            error?.response?.data?.message ||
              "Failed to fetch feed. Please try again.",
            "error"
          );
        }
      } else {
        setError("An unexpected error occurred");
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { feed, getFeed, loading, error };
};

export default useFeed;

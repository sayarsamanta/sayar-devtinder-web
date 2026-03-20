import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../app/slice/userSlice";

const useAcceptOrRejectRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const acceptOrRejectRequest = async (requestId, status) => {
    setLoading(true);
    setError(null);
    // Optimistically remove the request from the state
    try {
      const res = await axios.post(
        API_BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Update the state by filtering out the processed request
        dispatch(removeRequest(requestId));
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

  return { acceptOrRejectRequest, loading, error };
};

export default useAcceptOrRejectRequest;

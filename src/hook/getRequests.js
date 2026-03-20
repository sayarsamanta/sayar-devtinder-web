import { useState, useCallback, useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setRequests } from "../app/slice/userSlice";

const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API_BASE_URL + "/requests/received", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setRequests(res.data));
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
  }, [dispatch]);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  return { getRequests, loading, error };
};

export default useRequests;

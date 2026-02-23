import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setConnections } from "../app/slice/userSlice";

const useConnections = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE_URL + "request/connections", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(setConnections(res.data));
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

  return { getConnections, loading, error };
};

export default useConnections;

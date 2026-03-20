import { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slice/userSlice"; // adjust path
import { API_BASE_URL } from "../utils/constants"; // adjust path
import { useNavigate } from "react-router-dom";

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(API_BASE_URL + "/user", {
        withCredentials: true,
      });

      if (res.status === 200) {
        dispatch(setUser(res?.data?.data));
        navigate("/");
      }
    } catch (error) {
      if (isCancel(error)) {
        setError("Request cancelled");
      } else if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          setError("Unauthorized. Please login again.");
          navigate("/login");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { getUser, loading, error };
};

export default useGetUser;

import { useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../app/slice/userSlice"; // adjust path
import { API_BASE_URL } from "../utils/constants"; // adjust path
import { getErrorMessage } from "../utils/getErrorMessage";
import { showToast } from "../utils/toast";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        API_BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        showToast("Login successful", "success");
        dispatch(setUser(res?.data?.data));
        navigate("/");
      }
    } catch (error) {
      if (isCancel(error)) {
        setError("Request cancelled");
      } else if (error instanceof AxiosError) {
        setError(getErrorMessage(error));
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;

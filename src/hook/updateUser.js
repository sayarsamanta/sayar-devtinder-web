import { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slice/userSlice"; // adjust path
import { API_BASE_URL } from "../utils/constants"; // adjust path
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";

const useUpdateUser = () => {
  const user = useSelector((state) => state.user);

  const { _id } = user?.user || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.patch(
        API_BASE_URL + "user/edit/" + _id,
        userData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(setUser(res?.data));
        showToast("Profile updated successfully!", "success");
        navigate("/profile");
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
          showToast(
            error?.response?.data?.message ||
              "Failed to update user. Please try again.",
            "error"
          );
          setError("Failed to update user. Please try again.");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;

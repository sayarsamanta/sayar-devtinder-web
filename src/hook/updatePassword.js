import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slice/userSlice";

const useUpdatePassword = () => {
  const user = useSelector((state) => state.user);
  const { _id } = user?.user || {};
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updatePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    try {
      const data = await axios.patch(
        API_BASE_URL + "/user/updatePassword/" + _id,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      showToast(
        "Password updated successfully. Please log in again.",
        "success"
      );
      dispatch(setUser(data?.data?.data));
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Failed to update password. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
};
export default useUpdatePassword;

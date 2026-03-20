import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
        skills: formData.skills,
      };

      const response = await axios.post(API_BASE_URL + "/signup", payload, {
        withCredentials: true,
      });

      if (response.status === 201) {
        showToast("Signup successful! Please login.", "success");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
      showToast(
        "Signup failed: " +
          (err.response?.data?.message || "Please try again."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
export default useSignup;

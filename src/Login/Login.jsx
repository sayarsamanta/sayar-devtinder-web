import React from "react";
import axios, { isCancel, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slice/userSlice";
import { API_BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        API_BASE_URL + "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // Handle successful login, e.g., redirect to dashboard
        dispatch(setUser(res?.data?.data));
        navigate("/");
      }
    } catch (error) {
      if (isCancel(error)) {
        setError("Request cancelled");
      } else if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || "An error occurred during login"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center mt-32 font-['Poppins']">
      <fieldset
        className="fieldset bg-base-200 rounded-box w-xs p-4 h-80 shadow-2xl"
        style={{ backgroundColor: "var(--color-navbar)" }}
      >
        <label
          className="fieldset-legend flex justify-center text-lg font-['Space_Grotesk']"
          style={{ color: "var(--color-bg)" }}
        >
          Login
        </label>

        <label className="label" style={{ color: "var(--color-bg)" }}>
          Email
        </label>
        <input
          type="email"
          className="input focus:outline-none focus:ring-0 focus:border-[#818cf8] focus:border-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: "var(--color-bg)" }}
        />

        <label className="label" style={{ color: "var(--color-bg)" }}>
          Password
        </label>
        <input
          type="password"
          className="input focus:outline-none focus:ring-0 focus:border-[#818cf8] focus:border-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ backgroundColor: "var(--color-bg)" }}
        />

        <button
          disabled={loading}
          className="btn btn-neutral mt-4 border-0 shadow-sm shadow-[#818cf8]"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-navbar)",
          }}
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-[#4f46e5] border-t-transparent rounded-full animate-spin"></span>
          )}

          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && (
          <span
            className="color-red text-sm mt-2"
            style={{ color: "var(--color-error)" }}
          >
            {error}
          </span>
        )}
      </fieldset>
    </div>
  );
}

export default Login;

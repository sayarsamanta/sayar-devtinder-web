import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hook/userLogin";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className=" flex items-start justify-center pt-1 sm:pt-1 md:pt-1 lg:pt-10 px-4 font-['Poppins']">
      <form
        onSubmit={handleSubmit}
        className="w-full
        sm:w-4/5
        md:w-2/3
        lg:w-1/2
        xl:w-1/3
        2xl:w-1/4
        bg-white
        shadow-2xl
        rounded-2xl h-1/2
        transition-all duration-300 p-10 flex flex-col gap-6"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title */}
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: "#4f46e5" }}
        >
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4 rounded-lg outline-none"
          style={{
            border: "1.5px solid #9aa0ff",
            color: "#4f46e5",
          }}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full px-4 pr-10 rounded-lg outline-none"
            style={{
              border: "1.5px solid #9aa0ff",
              color: "#4f46e5",
            }}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "#4f46e5" }}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm font-medium transition"
            style={{ color: "#4f46e5" }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-lg font-semibold text-white transition"
          style={{
            background: "linear-gradient(90deg, #4f46e5 0%, #5b4cf2 100%)",
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Error */}
        <div className="h-6">
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#9aa0ff]"></div>
          <span className="text-sm text-[#9aa0ff]">OR</span>
          <div className="flex-1 h-px bg-[#9aa0ff]"></div>
        </div>

        {/* Navigate to Signup */}
        <div className="text-center">
          <p className="text-sm text-[#9aa0ff] mb-2">New here?</p>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="h-12 w-full rounded-lg font-medium transition"
            style={{
              border: "1.5px solid #4f46e5",
              color: "#4f46e5",
              backgroundColor: "transparent",
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

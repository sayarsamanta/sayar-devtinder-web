import React from "react";
import useLogin from "../hook/userLogin";
import { Eye, EyeOff } from "lucide-react";
function Login() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, loading, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="flex justify-center items-start pt-28 px-4 font-['Poppins'] min-h-screen bg-(--color-bg)">
      <fieldset
        className="
      bg-base-200
      rounded-2xl
      w-full
      max-w-md
      md:max-w-lg
      p-8 md:p-10
      shadow-xl
      flex flex-col
      gap-6
      h-130
    "
        style={{ backgroundColor: "var(--color-navbar)" }}
      >
        {/* Title */}
        <h2
          className="text-2xl font-semibold text-center tracking-wide font-['Space_Grotesk']"
          style={{ color: "var(--color-bg)" }}
        >
          Welcome Back
        </h2>

        {/* Email Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm" style={{ color: "var(--color-bg)" }}>
            Email
          </label>
          <input
            type="email"
            className="input w-full h-12 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-footer)",
            }}
          />
        </div>

        {/* Password Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm" style={{ color: "var(--color-bg)" }}>
            Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="input w-full h-12 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-footer)",
              }}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="
        w-full
        h-12
        rounded-lg
        font-medium
        shadow-md
        hover:shadow-lg
        active:scale-[0.98]
        transition-all
        duration-300
        flex
        items-center
        justify-center
        mt-7
      "
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-navbar)",
          }}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Error */}
        {error && (
          <span
            className="text-sm text-center"
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

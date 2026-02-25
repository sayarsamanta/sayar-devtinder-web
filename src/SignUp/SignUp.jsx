import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../hook/useSignup";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup: signUp } = useSignup();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    skills: "",
    gender: "",
    about: "",
    photoURL: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      setError("First name, Last name, Email and Password are required");
      return;
    }

    const payload = {
      ...formData,
      age: formData.age ? Number(formData.age) : null,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
    };

    signUp(payload);
  };

  return (
    <div className="flex items-start justify-center pt-1 sm:pt-1 md:pt-1 lg:pt-10 px-4 font-['Poppins']">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Dev Tinder Signup
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Profile Pic */}
          <input
            type="text"
            name="photoURL"
            placeholder="Profile Picture URL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* About */}
          <textarea
            name="about"
            placeholder="About"
            rows="3"
            value={formData.about}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="grow h-px bg-indigo-500/30"></div>
          <span className="px-3 text-indigo-300 text-sm">OR</span>
          <div className="grow h-px bg-indigo-500/30"></div>
        </div>

        {/* Sign Up CTA */}
        <div className="text-center">
          <p className="text-indigo-300 text-sm mb-2">Already user?</p>

          <button
            onClick={() => navigate("/login")}
            className="w-full border text-indigo-300 hover:bg-indigo-600 hover:text-white font-semibold py-2 rounded-lg transition duration-300"
            style={{
              border: "1.5px solid #4f46e5",
              color: "#4f46e5",
              backgroundColor: "transparent",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

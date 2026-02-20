import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/slice/userSlice";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  console.log("User in NavBar:", user);

  const handleClick = (e) => {
    const text = e.target.textContent;
    if (text === "Logout") {
      // Dispatch logout action here
      console.log("Logout clicked");
      dispatch(logout()); // Assuming you have a logout action defined in your user slice
      navigate("/login"); // Redirect to login page after logout
    } else if (text === "Profile") {
      // Navigate to profile page
      console.log("Profile clicked");
    } else if (text === "Settings") {
      // Navigate to settings page
      console.log("Settings clicked");
    }
  };
  return (
    <div
      className="navbar shadow-sm shadow-[#818cf8]"
      style={{ backgroundColor: "var(--color-navbar)" }}
    >
      <div className="flex-1">
        <a className="font-['Space_Grotesk'] btn btn-ghost text-2xl text-white">
          Dev Tinder
        </a>
      </div>
      {user && (
        <div className="font-['Poppins'] flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto text-white placeholder-white bg-[#818CF8]"
          />
          <div className="dropdown dropdown-end mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL || "https://placeimg.com/80/80/people"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;

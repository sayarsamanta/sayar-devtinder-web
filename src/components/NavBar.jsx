import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { logout as SignOut } from "../app/slice/userSlice";
import { showToast } from "../utils/toast";
import useSearchFeed from "../hook/searchFeed";

export function NavBar() {
  const { searchFeed, loading } = useSearchFeed();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchFeed();
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchFeed = async () => {
    try {
      if (search.length) {
        searchFeed(search);
      }
    } catch (err) {
      showToast("Failed to fetch feed. Please try again.", "error");
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const text = e.target.textContent;
    if (text === "Logout") {
      const logout = await axios.post(
        API_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (logout.status === 200) {
        dispatch(SignOut());
        showToast("Logged out successfully", "success");
        navigate("/login");
      }
    } else if (text === "ProfileNew") {
      navigate("/profile");
    } else if (text === "Requests") {
      navigate("/requests");
    } else if (text === "Connections") {
      navigate("/connections");
    }
  };
  return (
    <div
      className="navbar shadow-sm shadow-[#818cf8] px-5"
      style={{ backgroundColor: "var(--color-navbar)" }}
    >
      <div className="flex-1">
        <Link to={"/"} className="font-['Space_Grotesk'] text-2xl text-white">
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="font-['Poppins'] flex">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto text-white placeholder-white bg-[#818CF8]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                  src={
                    user?.photoURL ||
                    "https://www.w3schools.com/w3images/avatar2.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              onClick={(e) => {
                document.activeElement.blur();
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
                <a className="justify-between">Requests</a>
              </li>
              <li>
                <a className="justify-between">Connections</a>
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

import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import useGetUser from "./hook/getUser";
import { Toaster } from "react-hot-toast";
function Body() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const { getUser, error } = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    // if token is there but user data is not there then we can fetch the user data and set it in the store
    if (!user) {
      // fetch user data and set it in the store
      // we can use the getUser hook to fetch the user data and set it in the store
      // we can also use the token to fetch the user data
      getUser();
    } else if ((!token && !user) || error) {
      // if token is not there then we can proceed to login page
      navigate("/login");
    } else {
      // if user data is there then we can proceed to home page
      navigate("/");
    }
  }, []);
  return (
    <div
      className="h-dvh flex flex-col font-['Poppins']"
      style={{ backgroundColor: "var(--color-body)" }}
    >
      <NavBar />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div
          className={`min-h-full px-4 pt-10 ${
            user ? "pb-28 sm:pb-32" : "pb-16 sm:pb-24"
          }`}
        >
          <Outlet />
        </div>
      </main>

      {user && <Footer />}
      <Toaster />
    </div>
  );
}

export default Body;

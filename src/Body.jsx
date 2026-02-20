import React from "react";
import NavBar from "./components/navBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { useSelector } from "react-redux";
function Body() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-screen" style={{ backgroundColor: "var(--color-body)" }}>
      <NavBar />
      <Outlet />
      {user && <Footer />}
    </div>
  );
}

export default Body;

import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

function Logo({ authRoute, isBigSidebar }) {
  const dashboardContext = useDashboardContext();
  return (
    <Link
      to={authRoute ? "/" : "/dashboard"}
      onClick={!isBigSidebar ? dashboardContext?.toggleSidebar : null}
    >
      <img src={logo} alt="Jobify" className="logo" />
    </Link>
  );
}

export default Logo;

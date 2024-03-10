import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import { USER_TYPES } from "../../../utils/constants";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { role, userType, isTestUser } = user;

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (
          (path === "add-job" || path === "stats") &&
          userType === USER_TYPES.JOB_SEEKER &&
          !isTestUser
        )
          return;
        if (path === "admin" && role != "admin") return;
        if (
          path === "my-applications" &&
          userType === USER_TYPES.RECRUITER &&
          !isTestUser
        )
          return;
        if (
          path === "my-jobs" &&
          userType === USER_TYPES.JOB_SEEKER &&
          !isTestUser
        )
          return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={!isBigSidebar ? toggleSidebar : null}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;

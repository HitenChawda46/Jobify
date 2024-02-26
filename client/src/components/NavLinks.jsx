import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { role } = user;

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && role != "admin") return;
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

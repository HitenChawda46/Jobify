import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { Logo, NavLinks } from "../components";
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSideBar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;

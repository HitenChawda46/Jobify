import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from "..//components";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;

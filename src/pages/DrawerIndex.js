import { Drawer } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {useLocation, useNavigate} from "react-router";
import { NavLink } from "react-router-dom";
import dashboard from "../assets/images/Dashboard-Icon.svg";
import activity from "../assets/images/Activity-Icon.svg";
import logoutIcon from "../assets/images/logout.svg";
import {useAuth} from "../context/AuthContext";
const title = {
  dashboard: "Dashboard",
  leads: "Lead Management",
};
const DrawerIndex = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const header = useMemo(() => {
    const titles = location?.pathname.split("/");
    if (titles.length > 2) {
      return titles[2] ? titles[2] : "dashboard";
    }
  }, [location?.pathname]);

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const agentProfileDetails = JSON.parse(localStorage.getItem('agentProfileDetails'));

  const rejected = agentProfileDetails?.agentLicense?.find(item => item.license_verification_status == "reject") || agentProfileDetails?.agentLicense?.find(item => item.license_verification_status == "pending")

  

  return (
    <>
      <div className="layout">
        <section className="main-dashboard">
          <div className="side-bar">
            <div className="side-bar-top">
              <NavLink to={location?.pathname == '/warning/rejected' ? "#" : rejected && location?.pathname == '/update-details' ? "#" : "/dashboard"} className="side-bar-link">
                <img src={dashboard} alt="img" />
                <div>Dashboard</div>
              </NavLink>
              <NavLink to={location?.pathname == '/warning/rejected' ? "#" : rejected && location?.pathname == '/update-details' ? "#" : "/lead-management"} className="side-bar-link">
                <img src={activity} alt="img" />
                <div>Lead Management</div>
              </NavLink>
            </div>
            <div className="side-bar-link" onClick={handleLogout}>
              <img src={logoutIcon} alt="img" />
              <p className="link">Logout</p>
            </div>
          </div>
          <div className="activity-dashboard">
            <div className="d-flex activity-dashboard-header justify-between align-items: center;">
              <h1 className="m-0 p-0 self-center">{title[header]}</h1>
              <div className="d-flex gap-20 search-section">
                <div className="grid-box" onClick={() => setOpen(true)}>
                  <div className="grid-icon">
                    <div className="icon-line1"></div>
                    <div className="icon-line2"></div>
                    <div className="icon-line1"></div>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </section>
        <div>
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <div className="sidebarHeader">
              <h4>
                YOLO<span>H</span>
              </h4>
              {/* <CloseOutlinedIcon onClick={() => setOpen(false)} /> */}
            </div>
            <div className="mainSideBar">
              <NavLink
                to="/dashboard/"
                className="d-flex align-items-center gap-10"
              >
                <img src={dashboard} alt="img" />
                <div>Dashboard</div>
              </NavLink>
              <NavLink
                to="/lead-management"
                className="d-flex align-items-center gap-10"
              >
                <img src={activity} alt="img" />
                <div>Lead Management</div>
              </NavLink>
              <p onClick={handleLogout} className="d-flex align-items-center gap-10 link">
                <img src={logoutIcon} alt="img" />
                <div>Logout</div>
              </p>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default DrawerIndex;

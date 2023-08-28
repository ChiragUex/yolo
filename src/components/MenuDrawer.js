import React, { useRef, useState } from "react";
import { Button, Drawer } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";
import down from "../assets/images/down.svg";
import homeIns from "../assets/images/Home-ins.svg";
import floodIns from "../assets/images/Flood-ins.svg";

const MenuDrawer = ({ setLoginModal, isLayout, isPrivate }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const ref = useRef();
  useOnClickOutside(ref, () => (isShown ? setIsShown(false) : null));
  return (
    <div>
      <Button onClick={() => setOpen(true)} className="sidebarToggal">
        <FormatAlignJustifyIcon color="#000" />
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="sidebarHeader">
          <h4>
            YOLO<span>H</span>
          </h4>
          <CloseOutlinedIcon onClick={() => setOpen(false)} />
        </div>
        <div className="mainSideBar">
          {isPrivate ? (
            <>
              <li onClick={() => setOpen(false)}>
                <NavLink to="/dashboard/">Dashboard</NavLink>
              </li>
              {isLayout && (
                <li className="menuDropMain" ref={ref}>
                  <div className="menuDrop">
                    <a href="#" onClick={handleClick}>
                      Request Quotes
                    </a>
                    <img width="12px" alt="Angular Logo" src={down} />
                  </div>
                  {isShown ? (
                    <div className="menuDropLinks">
                      <div
                        onClick={() => {
                          navigate("/dashboard/home-insurance");
                          handleClick();
                          setOpen(false);
                        }}
                        className="menuDropLinksMain"
                      >
                        <div className="d-flex gap-10 align-items-center">
                          <img src={homeIns} alt="home" className="menu-img" />
                          <div>
                            <strong>Home Insurance</strong>
                          </div>
                        </div>
                      </div>
                      <div
                        className="menuDropLinksMain"
                        onClick={() => {
                          navigate("/dashboard/flood-insurance");
                          handleClick();
                          setOpen(false);
                        }}
                      >
                        <div className="d-flex gap-10 align-items-center">
                          <img src={floodIns} alt="home" className="menu-img" />
                          <div>
                            <strong>Flood Insurance</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/product">Product</NavLink>
              </li>
              <button className="loginBtn" onClick={() => setLoginModal(true)}>
                Login
              </button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;

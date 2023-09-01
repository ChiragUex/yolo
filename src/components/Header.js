import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.png";
import down from "../assets/images/down.svg";
import { Button, Card, Container, Popper } from "@mui/material";
import MenuDrawer from "./MenuDrawer";
import Modal from "@mui/material/Modal";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { users } from "../redux/slices/authReducer";
import EditIcon from "@mui/icons-material/Edit";
import homeIns from "../assets/images/Home-ins.svg";
import floodIns from "../assets/images/Flood-ins.svg";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout, Settings } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../http/services/local-storage";
import { Link } from "react-scroll";
import { getAgentProfileDetailsPayloadTemplate } from "../http/services/api-payload-prepare";
import { getAgentProfileApi } from "../http/services/user.service";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';




export const Header = ({ isLayout, isPrivate, isView }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { getItem, setItem } = useLocalStorage();
  const [isShown, setIsShown] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const auth = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();
  // const open = Boolean(anchorEl);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const openLoginModal = () => {
    setLoginModal(true);
  };
  const closeLoginModal = () => {
    setLoginModal(false);
  };
  const onLogin = () => {
    dispatch(users({ userName: "auth" }));
  };
  const ref = useRef();
  useOnClickOutside(ref, () => (isShown ? setIsShown(false) : null));

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const { authUser, setAuthUser, isLoggedIn } = useAuth();
  const [accountCreated, setAccountCreated] = useState(false);
  const [selectedMenu,setSelectedMenu] = useState();
  const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem("agentProfileData")) ? JSON.parse(localStorage.getItem("agentProfileData")) : JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile ? JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile : "");
  // useEffect(() => {
  //   if (getItem("authUserValidated") === "true") {
  //     setAccountCreated(true);
  //     if (getItem("authUserProfile")) {
  //       setProfileData(getItem("authUserProfile") ? JSON.parse(getItem("authUserProfile")) : false);
  //     }
  //   }
  //   // else if (location && location.search && location.search.replace("?", "") === 'login') {
  //   //   setLoginModal(true)
  //   // }
  // }, []);

  let agentData;
  let agentProfileDetails;

  useEffect(() => {
     agentData = JSON.parse(localStorage.getItem("agentProfileData")) ? JSON.parse(localStorage.getItem("agentProfileData")) : JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile;
     agentProfileDetails = JSON.parse(localStorage.getItem('agentProfileDetails'));
    const payload = getAgentProfileDetailsPayloadTemplate();
    getAgentProfileApi(payload).then((response) => {
      // console.log("getAgentProfileDetailsPayloadTemplate response : ", response);
      setItem('agentProfileDetails',JSON.stringify(response));
      setItem('agentProfileData', JSON.stringify(response?.profile));
      setProfileData(response?.profile);
      if(response?.profile?.agent_verification_status == "pending"){
        navigate('/warning/notapproved');
        return;
      }
      else if(response?.agentLicense?.find(item => item.license_verification_status == "reject" || response?.agentLicense?.find(item => item.license_verification_status == "pending"))){
        navigate('/warning/rejected');
        return;
      }
    })
      .catch((error) => {
        console.log("error : ", error);
      })
      // console.log("test useeffct :",JSON.parse(localStorage.getItem("agentProfileData")),JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile);
  }, []);

  // console.log("localStorage.getItem agent profile : ", JSON.parse(localStorage.getItem("agentProfileData")))
 
  const handleDropdownMenu = (value) => {
    setSelectedMenu(value);
    setAnchorEl(null)
  }

  useEffect(()  =>  {

    console.log("inside text  : ",JSON.parse(localStorage.getItem("agentProfileData")),JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile);

  },[JSON.parse(localStorage.getItem("agentProfileDetails")),JSON.parse(localStorage.getItem("agentProfileData"))])


  // console.log("test useeffct out : ",JSON.parse(localStorage.getItem("agentProfileData")),JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile);

  const rejected = agentProfileDetails?.agentLicense?.find(item => item.license_verification_status == "reject");

  console.log("getting values : ", JSON.parse(localStorage.getItem("agentProfileData"))?.profile_picture?.length ? JSON.parse(localStorage.getItem("agentProfileData"))?.profile_picture :  JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.profile_picture?.length ? JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.profile_picture : JSON.parse(localStorage.getItem("agentProfileData"))?.first_name);

  return (
    <>
      <div className="mainHeader">
        <Container maxWidth="true" style={{ padding: "0px 70px" }}>
          <div className="toolbar" role="banner">
            <img
              width="136px"
              alt="Angular Logo"
              src={logo}
              className="logoMain"
              onClick={() => navigate(location?.pathname == '/warning/rejected' ? "#" : rejected && location?.pathname == '/update-details' ? "#" : "/dashboard")}
            />
            <div className="headerLink">
              {
                !isPrivate ?
                (
                  <>
                    <li onClick={() => onLogin()}>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <Link
                        to="about"
                        spy={true}
                        smooth={true}
                        style={{ cursor: "pointer" }}
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <NavLink to="/product">Products</NavLink>
                    </li>
                  </>
                )
              :
              <>
              <li>
              <NavLink
                to="/dashboard"
                className={location?.pathname == '/dashboard' ? "d-flex align-items-center gap-10 activeNavLink" : "d-flex align-items-center gap-10 inactiveNavLink"}
              >
                <div>Dashboard</div>
              </NavLink>
              </li>
              <li>
              <NavLink
                to="/lead-management"
                className={location?.pathname == '/lead-management' ? "d-flex align-items-center gap-10 activeNavLink" : "d-flex align-items-center gap-10 inactiveNavLink"}
              >
                <div>Lead Management</div>
              </NavLink>
              </li>
              </>
              }
            </div>
            {isPrivate && accountCreated && (
              <div className="userInfo">
                <div
                  className="userEdit"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleProfileMenuClick}
                >
                  <img
                    width="50px"
                    height="50px"
                    className="userImg"
                    alt="Angular Logo"
                    src={user}
                  />
                  <div className="edit-pen">
                    <EditIcon fontSize="10px" />
                  </div>
                </div>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  disableScrollLock={true}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 24,
                        height: 24,
                        // ml: -0.5,
                        mr: 3,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/dashboard/profile");
                      handleClose();
                    }}
                  >
                    <Avatar sx={{ width: 24, height: 24 }} src={user} />
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

                <h4>{profileData?.first_name && profileData?.first_name}</h4>
              </div>
            )}
            {!isPrivate && (
              <button
                className="loginBtn loginBtnHeader"
                onClick={() => openLoginModal(!loginModal)}
              >
                Login
              </button>
            )}

            {
               isPrivate && (
                <>
                  <div className="headProfileDiv">
                    <div className="user-logo" >
                      {
                        agentData?.profile_picture?.length || JSON.parse(localStorage.getItem("agentProfileData"))?.profile_picture?.length || JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.profile_picture?.length ?
                          <img
                            width="50px"
                            height="50px"
                            className="userImg"
                            alt="profile picture"
                            src={JSON.parse(localStorage.getItem("agentProfileData"))?.profile_picture?.length ? JSON.parse(localStorage.getItem("agentProfileData"))?.profile_picture :  JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.profile_picture?.length ? JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.profile_picture : ""}
                          />
                          :
                          <>
                            <p className="userProfileName">{JSON.parse(localStorage.getItem("agentProfileData"))?.first_name?.length ? JSON.parse(localStorage.getItem("agentProfileData"))?.first_name[0] : JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.first_name?.length ? JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.first_name[0] : JSON.parse(localStorage.getItem("agentProfileData"))?.first_name[0]}</p>
                          </>
                      }
                    </div>
                    &nbsp;
                    {/* <p>{agentData?.first_name + " " + agentData?.last_name}</p> */}
                    <Button onClick={(event) => setAnchorEl(anchorEl ? null : event.currentTarget)}> <p className="agentName">{JSON.parse(localStorage.getItem("agentProfileData")) ? JSON.parse(localStorage.getItem("agentProfileData"))?.first_name + " " + JSON.parse(localStorage.getItem("agentProfileData"))?.last_name : JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile ? JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.first_name + " " + JSON.parse(localStorage.getItem("agentProfileDetails"))?.profile?.last_name : agentData?.first_name + " " + agentData?.last_name}</p> {!open ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}</Button>
                    <Popper id={id} open={open} anchorEl={anchorEl} className="poper">
                      <Card>
                        <MenuItem onClick={() => {handleDropdownMenu(0);navigate('/update-details')}} > <ListItemIcon> <EditIcon fontSize="inherit" color="primary"/> </ListItemIcon> Edit Profile</MenuItem>
                        <MenuItem onClick={() => {handleDropdownMenu(1);handleLogout()}} >
                          <ListItemIcon>
                            <Logout fontSize="small" color="primary"/>
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Card>
                    </Popper>
                  </div>
                </>
              )
            }

            <MenuDrawer
              setLoginModal={setLoginModal}
              isPrivate={isPrivate}
              isLayout={isLayout}
            />
            <Modal
              keepMounted={false}
              open={loginModal}
              // onClose={closeLoginModal}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <Box>
                <Login setLoginModal={setLoginModal} />
              </Box>
            </Modal>
          </div>
        </Container>
      </div>
    </>
  );
};

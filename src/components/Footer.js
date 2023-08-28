import { Container } from "@mui/material";
import React from "react";
import logo from "../assets/images/logo.svg";
import faceBook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import linkdin from "../assets/images/linkdin.png";
import twitter from "../assets/images/twitter.png";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router";

const Footer = ({ isPrivate }) => {
  const { authUser } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="footer">
        <Container>
          <img
            width="136px"
            alt="Angular Logo"
            src={logo}
            className="logoMain"
            onClick={() => navigate("/")}
          />
          {!authUser?.attributes?.email && (
            <div className="footerLink">
              <Link to="/">
                <h3 className="active">Home</h3>
              </Link>
              <h3>|</h3>
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                style={{ cursor: "pointer" }}
              >
                <h3>About Us</h3>
              </ScrollLink>
              <h3>|</h3>
              <Link to="/product">
                <h3>Products</h3>
              </Link>
            </div>
          )}

          <div className="footerLink">
            <a href="https://www.facebook.com/HappyYoloh" target="_blank">
              <img
                width="136px"
                alt="Angular Logo"
                src={faceBook}
                className="footerSocial"
              />
            </a>

            <a href="https://www.linkedin.com/company/yoloh" target="_blank">
              <img
                width="136px"
                alt="Angular Logo"
                src={linkdin}
                className="footerSocial"
              />
            </a>

            <a href="http://www.google.com" target="_blank">
              <img
                width="136px"
                alt="Angular Logo"
                src={instagram}
                className="footerSocial"
              />
            </a>

            <a href="http://www.google.com" target="_blank">
              <img
                width="136px"
                alt="Angular Logo"
                src={twitter}
                className="footerSocial"
              />
            </a>
          </div>
          <h5>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </h5>
        </Container>
      </div>
      <div className="bottomFooter">
        <Container>
          <p>© 2022 Yoloh | Powered by Yoloh</p>
        </Container>
      </div>
    </>
  );
};

export default Footer;

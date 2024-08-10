import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaTwitter, FaGoogle, FaGithub } from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

export const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("token");

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#008080",
    color: "#fff",
    width: "1903px",
    boxSizing: "border-box",
  };

  const logoStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  };

  const navLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    margin: "0 15px",
    transition: "color 0.3s",
  };

  const socialIconsStyle = {
    display: "flex",
    alignItems: "center",
  };

  const socialIconStyle = {
    fontSize: "24px",
    color: "#fff",
    margin: "0 10px",
    transition: "color 0.3s",
  };

  const editIconStyle = {
    fontSize: "24px",
    color: "#fff",
    marginLeft: "15px",
    transition: "color 0.3s",
  };

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ width: "100%" }}>
      <nav style={navbarStyle}>
        <div className="logo">
          <Link to="/" style={logoStyle}>
            <HomeOutlinedIcon style={{ fontSize: "35px" }} />
          </Link>
        </div>

        <ul style={navLinksStyle}>
          <li>
            <Link to="/" style={navLinkStyle} className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/details" style={navLinkStyle} className="nav-link">
              Beds
            </Link>
          </li>
          <li>
            <Link to="#" style={navLinkStyle} className="nav-link">
              Blood Bank
            </Link>
          </li>
        </ul>

        <div style={socialIconsStyle}>
          <a
            href="http://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaTwitter />
          </a>
          <a
            href="http://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaGoogle />
          </a>
          <a
            href="http://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaGithub />
          </a>

          {isAdmin && (
            <>
              <Link to="/add" style={editIconStyle}>
                <EditIcon />
              </Link>
              <Tooltip title="Logout">
                <div
                  style={{ ...editIconStyle, cursor: "pointer" }}
                  onClick={handleLogOut}
                >
                  <LogoutIcon />
                </div>
              </Tooltip>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

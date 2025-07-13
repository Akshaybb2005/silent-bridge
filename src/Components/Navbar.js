import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top py-3"
      style={{
        background: "#3f3aaa",
        borderBottom: "none",
        marginBottom: "0",
        boxShadow: "none", // Remove shadow to blend with homepage
      }}
      id="mainNav"
    >
      <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* Logo & Brand Name */}
        <Link
          to="/silent-bridge/home"
          className="navbar-brand d-flex align-items-center"
        >
          <img src={logo} width="40" height="40" className="me-2" alt="Logo" />
          <span className="fw-bold fs-4 text-white">Silent Bridge</span>
        </Link>

        {/* Custom Navbar Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarResponsive"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "24px" }}
          >
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
          </div>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMenuOpen ? "show" : ""
          }`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav d-flex align-items-center gap-4">
            <li className="nav-item">
              <Link
                to="/silent-bridge/home"
                className="nav-link fs-6 text-white"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/silent-bridge/convert"
                className="nav-link fs-6 text-white"
              >
                Convert
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/silent-bridge/learn-sign"
                className="nav-link fs-6 text-white"
              >
                Learn Sign
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/silent-bridge/all-videos"
                className="nav-link fs-6 text-white"
              >
                Videos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay position-fixed w-100"
          style={{
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#3f3aaa",
            zIndex: 999,
          }}
        >
          <div className="container py-4">
            <ul className="nav flex-column gap-3">
              <li className="nav-item">
                <Link
                  to="/silent-bridge/home"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/silent-bridge/convert"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Convert
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/silent-bridge/learn-sign"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Learn Sign
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/silent-bridge/all-videos"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Videos
                </Link>
              </li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../navbar/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="hamburger-icon" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="logo">
        <Link to="/">
          <img src="/logo192.png" alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <div className={`icons ${isMenuOpen ? "open" : ""}`}>
        <i class="fa-solid fa-magnifying-glass" />
        <i class="fa-brands fa-uncharted" /> {/* app */}
        <i class="fa-solid fa-expand" />
        <div className="notification">
          <i className="fa-regular fa-bell mr-2" />
          <span>1</span>
        </div>
        <div className="user">
          <i className="fa-regular fa-user mr-2" />
        </div>
        <i class="fa-solid fa-gear" />
      </div>
    </div>
  );
};

export default Navbar;

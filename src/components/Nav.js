import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "black",
    textDecoration: "none",
  };

  return (
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        <Link to="/" style={navStyle}>
          <li>Login</li>
        </Link>
        <Link to="/game" style={navStyle}>
          <li>Start New Game</li>
        </Link>
        <Link to="/about" style={navStyle}>
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;

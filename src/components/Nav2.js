import React from "react";
import { Link } from "react-router-dom";

function Nav2() {
  const navStyle = {
    color: "black",
    textDecoration: "none",
  };

  return (
    <nav>
      <ul className="nav-links">
        <h3>Beer Game</h3>
      </ul>
    </nav>
  );
}

export default Nav2;

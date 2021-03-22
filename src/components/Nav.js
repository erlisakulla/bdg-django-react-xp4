import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  // const navStyle = {
  //   color: "black",
  //   textDecoration: "none",
  // };

  return (
    <nav>
      <div className="container">
          <div className="nav-wrapper">
          <Link to="/" className="brand-logo" >
          Beer Game
        </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        
          <li><Link to="/login" >Login</Link> </li>
        
          <li> <Link to="/signup" >Sign up </Link></li>
       
          <li> <Link to="/about" >About</Link></li>
      
      </ul>
      </div>
      </div>

    </nav>
  );
}

export default Nav;

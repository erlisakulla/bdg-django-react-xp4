import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  // const navStyle = {
  //   color: "black",
  //   textDecoration: "none",
  // };
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token !== null) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });
  return (
    <nav>
      <div className="container">
          <div className="nav-wrapper">
          <Link to="/" className="brand-logo" >
          Beer Game
        </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          { !isAuth ? (<Fragment>
                <li><Link to="/login" >Login</Link> </li>
                <li> <Link to="/signup" >Sign up </Link></li>
              </Fragment>) : <Fragment></Fragment>
          }
          <li> <Link to="/about" >About</Link></li>
          { isAuth ? (<Fragment>
                <li> <Link to="/logout" >logout</Link></li>
              </Fragment>) : <Fragment></Fragment>
          }
      </ul>
      </div>
      </div>

    </nav>
  );
}

export default Nav;

import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

function LandingPage (){
    return(

    <div className="container  blue-grey lighten-5  pt20 pl20 pr20 pb20">
          <p className="flow-text">Welcome to</p>
      <h1 className="  text-lighten-3">Beer Game</h1>

        <Link to ='/player' className="waves-effect waves-light btn mr10">Player</Link>
        <Link to ='/instructor' className="waves-effect waves-light btn ">Instructor</Link>

    </div>
    )
}

export default LandingPage;
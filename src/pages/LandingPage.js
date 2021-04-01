import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

function LandingPage (){
    return(

    <div className="container w-50 " style={{marginTop:150}}>
        <h1 className="text-lighten-3 text-center">Welcome to Beer Game</h1>
        <p className="text-center">Choose your role</p>
        <div className="d-flex align-items-center justify-content-center">
            <Link to ='/player' className="waves-effect waves-light btn mr10">Player</Link>
            <Link to ='/instructor' className="waves-effect waves-light btn ">Instructor</Link>
        </div>
    </div>
    )
}

export default LandingPage;
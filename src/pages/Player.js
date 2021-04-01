import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";

function Player() {
  const [currentGame, setCurrentGame] = useState(0);
  const [joinGameID, setjoinGameID] = useState(0);

  const [gamedata, setGameData] = useState(null);
  const [showRole, setShowRole] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userinfo, setUserInfo] = useState("None");
  const [errorforinfo, setErrorInfo] = useState("");
  const [errorforgame, setErrorGame] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    axiosInstance
      .get("user/info/")
      .then((res) => {
        setUserInfo(res.data.email);
      })
      .catch((err) => {
        if(err.response){
          setErrorInfo(JSON.stringify(err.response.data))
        }
        console.log(err);
      });
  }, []);
  let handlejoin = () => {
    axiosInstance
      .get("/game/" + joinGameID)
      .then(  (response) => {
        setGameData(response.data);
        setShowRole(true);
      })
      .catch( (error)  => {
        if(error.response
        ){
          setErrorGame(JSON.stringify(error.response.data))
        }
        setShowRole(false);
        setShowError(true);

      })
  };

  let handlecodechange = (e) => {
    setjoinGameID(e.target.value);
  };
  return (
    <div className="container">

      <h3>Hello {userinfo}</h3>
      <p>{errorforinfo}</p>
      
      <div className="row" style={{marginTop:60}}>

        <div className="col sm-6">
          <div className="container w-50">
            <p>Enter Code to Join Game</p>
            <div className="input-field">
              <input
                name="gamecode"
                id="gamecode"
                type="text"
                onChange={handlecodechange}
                className="validate"
              />
              <label className="active" htmlFor="gamecode">
                Game Code
              </label>
            </div>
            <div className="input-field col s2">
              <button className="btn" onClick={handlejoin}>
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="col sm-6">
          <div>
            <h1>Current Game</h1>

            <Getcurrentgame gid={1} />
            {showRole ? <Selectrole game={gamedata} /> : null}
            {showError ? <div>{errorforgame} </div> : null}
          </div>
        </div>
      </div>
      
    </div>
  );
}

function Selectrole(props) {
  const game = props.game;
  // game contains data display
  const [selectedrole, setSelectedRole] = useState(null);
  const [toredirect, setToredirect] = useState(false);

  function handleoptionchange(e) {
    setSelectedRole(e.target.value);
  }
  function handlerole() {
    //first save to database using api
    setToredirect(true);
  }
  if (toredirect) {
    return <Redirect to="/play" />;
  }
  if (game != null) {
    return (
      <div className="row">
        {JSON.stringify(game)}
        <div className="input-field col s6">
          <select className="browser-default" onChange={handleoptionchange}>
            <option defaultValue disabled>
              Choose your option ( not set yet )
            </option>
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
            <option value={3}>Option 3</option>
          </select>
        </div>

        <div className="input-field col s2">
          <button className="btn" onClick={handlerole}>
            submit
          </button>
        </div>
      </div>
    );
  } else {
    return <h1> Game Not Found </h1>;
  }
}

function Getcurrentgame(props) {
  if (props.gid != 0) {
    return (
      <div>
        Game : {props.gid} <br />
        Role : TOFIX <br />
        <Link to={"/play/"}>Continue</Link>
      </div>
    );
  }
  return <div> No current Game</div>;
}

export default Player;

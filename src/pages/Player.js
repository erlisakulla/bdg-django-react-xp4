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

  useEffect(() => {
    // Update the document title using the browser API
    axiosInstance
      .get("user/info/")
      .then((res) => {
        setUserInfo(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let handlejoin = () => {
    axiosInstance
      .get("/game/" + joinGameID)
      .then(function (response) {
        setGameData(response.data);
        setShowRole(true);
      })
      .catch(function (error) {
        setShowRole(false);
        setShowError(true);
      })
      .then(function () {});
  };

  let handlecodechange = (e) => {
    setjoinGameID(e.target.value);
  };
  return (
    <div className="container">
      <h1>Player Page</h1>
      <h3>current user : {userinfo}</h3>
      Enter Code to Join Game
      <div className="row">
        <div className="input-field col s6">
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
            submit
          </button>
        </div>
      </div>
      {showRole ? <Selectrole game={gamedata} /> : null}
      {showError ? <div>Game Not Found</div> : null}
      <div className="row">
        <div>
          <h1>Current Game</h1>

          <Getcurrentgame gid={1} />
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
              Choose your option
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

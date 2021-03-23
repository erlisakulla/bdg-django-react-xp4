import React, { Component, useState, useEffect } from "react";
import "./CSS/SignIn.css";
import { Tabs, Tab, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../components/Nav2";
import axiosInstance from "../axios";
import { Link } from "react-router-dom";

export default function Instructor() {
  const [gamedata, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errordata, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("game/")
      .then((res) => {
        console.log(res);
        setGameData(res.data);
        setLoading(false);
        setError();
      })
      .catch((err) => {
        setLoading(false);
        if(err.response){
          setError(JSON.stringify(err.response.data));
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

    let loadgame = () => {
    let component = [];
    {
      if (!loading) {
        gamedata.forEach((element) => {
          component.push(<ViewGame gamedata={element} />);
        });
        return component;
      } else if (errordata) {
        return <h1>{errordata}</h1>;
      } else {
        return <h1>Loading</h1>;
      }
  
  }
}
    return <div className="container">
    <h1>Games </h1>
    <Link to="/creategame" className="btn"> Create New Game </Link>
    <div>{errordata}</div>
    {loadgame()}
    </div>;
  
}

function ViewGame(props) {
  var gamedata = props.gamedata;
  return <p>{JSON.stringify(gamedata)}</p>;
}

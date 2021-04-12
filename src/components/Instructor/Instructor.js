import React, {Component, useState, useEffect} from "react";
import "../Login/style/SignIn.css";
import {Tabs, Tab, Button, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../Nav2";
import axiosInstance from "../../axios";
import {Link} from "react-router-dom";
import ViewGame from "./subComponents/game_view";

/*
    The main page of the Instructor which displays the games created.
*/

export default function Instructor() {
    const [gamedata,
        setGameData] = useState([]);
    const [loading,
        setLoading] = useState(true);
    const [errordata,
        setError] = useState("");

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
                if (err.response) {
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
                    component.push(
                        <tr><ViewGame key={gamedata.id} gamedata={element}/></tr>
                    );
                });
                return component;
            } else if (errordata) {
                return <h1>{errordata}</h1>;
            } else {
                return <h1>Loading</h1>;
            }

        }
    }
    return (
        <div className="container w-100" style={{
            marginTop: 60
        }}>
            <h1 className="text-center">Games
            </h1>
            <div>{errordata}</div>
            <table
                className="table table-striped"
                style={{
                marginTop: 50
            }}>
                <thead>
                    <tr>
                        <th scope="col">Game ID</th>
                        <th scope="col">Current Round</th>
                        <th scope="col">Game length</th>
                        <th scope="col">Backlog Cost</th>
                        <th scope="col">Holding Cost</th>
                        <th scope="col">Demand Pattern</th>
                        <th scope="col">Status</th>
                        <th scope="col">Starting Inventory</th>
                        <th scope="col">Time Delay</th>
                    </tr>
                </thead>

                <tbody>
                    {loadgame().length == 0
                        ? <p className="text-center">No Games Created</p>
                        : loadgame()}
                </tbody>
            </table>

            <Link
                to="/creategame"
                className="btn"
                style={{
                marginTop: 30
            }}>
                Create Game
            </Link>
            <Link
                to="/createdemand"
                className="btn btn-primary"
                style={{
                marginTop: 30,
                float: "right"
            }}>
                Create Demand Pattern
            </Link>
        </div>
    );

}

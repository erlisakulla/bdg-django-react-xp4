import React, {useState, useEffect} from "react";
import "../Login/style/SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
        axiosInstance.get("user/info/")
            .then((res) => {
                console.log(res.data);
                if (res.data.isAdmin === false) {
                    window.location = '/player';
                }
                else {
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
                }
            }
        );
    }, []);

    let loadgame = () => {
        let component = [];
        
        if (!loading) {
            gamedata.forEach((element) => {
                let count = 0;
                component.push(
                    <tr key={count++}><ViewGame key={gamedata.id} gamedata={element}/></tr>
                );
            });
            return component;
        } 
        else if (errordata) {
            return <tr><td>{errordata}</td></tr>;
        } 
        else {
            return <tr><td>Loading</td></tr>;
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
                    {loadgame().length === 0
                        ? <tr className="text-center"><td>No Games Created</td></tr>
                        : 
                        <>{loadgame()}</>
                        }
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

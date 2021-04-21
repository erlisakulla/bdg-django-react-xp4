import React from "react";
import { Link } from "react-router-dom";


function ViewGame(props) {
    var gamedata = props.gamedata;
    return (
        <React.Fragment>
            <td><Link to={"game/" + gamedata.game_id} >{gamedata.game_id}</Link></td>
            <td>{gamedata.rounds_completed}</td>
            <td>{gamedata.session_length}</td>
            <td>{gamedata.backlog_cost}</td>
            <td>{gamedata.holding_cost}</td>
            <td>{gamedata.demand_id}</td>
            <td>{gamedata.active_status === true ? "Active" : "Not Active"}</td>
            <td>{gamedata.starting_inventory}</td>
            <td>{gamedata.info_delay}</td>
            <td><Link to={"/editgame/" + gamedata.game_id} type="btn btn-primary">Edit Game</Link></td>
        </React.Fragment>
    );
  }

export default ViewGame;
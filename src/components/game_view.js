import React, { Component } from "react";


function ViewGame(props) {
    var gamedata = props.gamedata;
    return (
        <React.Fragment>
            <td>{gamedata.game_id}</td>
            <td>{gamedata.rounds_completed}</td>
            <td>{gamedata.session_length}</td>
            <td>{gamedata.backlog_cost}</td>
            <td>{gamedata.holding_cost}</td>
            <td>{gamedata.demand_id}</td>
            <td>{gamedata.active_status == true ? "Active" : "Not Active"}</td>
            <td>{gamedata.starting_inventory}</td>
            <td>{gamedata.info_delay}</td>
        </React.Fragment>
    );
  }

export default ViewGame;
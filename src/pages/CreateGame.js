import React, { Component, useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

export default function CreateGame() {
  let defaultdata = {
    session_length: 1,
    holding_cost: 1,
    backlog_cost: 1,
    wholesaler_present:true,
    distributer_present:true

  };
  const [formdata, setFromData] = useState(defaultdata);
  const [errordata, setError] = useState("");

  var history=useHistory()

  let handleOnChange = (e) => {
    setFromData((prevstate) => ({
      ...prevstate,
      [e.target.name]: Number(e.target.value),
    }));
  };

  let handleBoolOnChange = (e) => {
    setFromData((prevstate) => ({
      ...prevstate,
      [e.target.name]: !formdata[e.target.name],
    }));
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("game/", formdata, {
        crossDomain: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res);

        if (res.status === 201) {
          alert("Successfully Created Game");
          history.push("/instructor");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        if(err.response){
          setError(JSON.stringify(err.response.data))
          console.log(err.response.data);

        }
        console.log(err)
      });
  };
  return (
    <div className="container">
      <h3>Create New Game </h3>
      <div className="error">{errordata}</div>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="session_length"
                name="session_length"
                type="number"
                min={1}
                value={formdata.session_length}
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="session_length">Session Length</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  name="distributer_present"
                  onChange={handleBoolOnChange}
                  checked={formdata.distributer_present}
                />
                <span>distributer_present</span>
              </label>
            </div>
            <div className="input-field col s6">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  name="wholesaler_present"
                  onChange={handleBoolOnChange}
                  checked={formdata.wholesaler_present}
                />
                <span>wholesaler_present</span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="holding_cost"
                name="holding_cost"
                type="number"
                min={0}
                value={formdata.holding_cost}
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="holding_cost">Holding Cost</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="backlog_cost"
                name="backlog_cost"
                type="number"
                min={0}
                value={formdata.backlog_cost}
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="backlog_cost">Backlog Cost</label>
            </div>
          </div>
          
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="submitbutton"
            onClick={handleSubmit}
          >
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

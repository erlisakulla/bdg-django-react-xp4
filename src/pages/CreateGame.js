import React, { Component, useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

export default function CreateGame() {
  let defaultdata = {
    session_length: 1,
    game_id: '',
    info_delay:2,
    start_inventory:0,
    holding_cost: 1,
    backlog_cost: 1,
    wholesaler_present:true,
    info_sharing: true,
    distributer_present:true,
    demand_id: ''
  };
  
  const [formdata, setFromData] = useState(defaultdata);
  const [demand_list, getDemand] = useState([]);
  const [errordata, setError] = useState("");

  var history=useHistory()

  useEffect(() => {
    axiosInstance.get("game/demand")
    .then(
      res => {
        if (res.status == 200) {
          getDemand(res.data);
        }
      }
    );
  }, [demand_list]);

  let handleOnDemandChange = (e) => {
    setFromData((prevstate) => ({
      ...prevstate,
      'demand_id': e.target.value,
    }));

  };

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
    console.log(formdata);
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
    <div className="container w-50" style={{paddingTop:30}}>
      <h3 className="text-center">Create New Game </h3>
      <div className="error">{errordata}</div>
      <div className="row" style={{paddingTop:30}}>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
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
            <div className="input-field col s6">
              
              <select className='form-control' name='demand_id' onChange={handleOnDemandChange}>
                {
                  demand_list.map(
                    demand => {
                      return (
                        <option>{demand.demand_id}</option>
                      );
                    }
                  )
                }
              </select>
            </div>
          </div>
         
          <div className="row">
            <div className="input-field col s6">
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
            <div className="input-field col s6">
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
          <div className="row">
            <div className="input-field col s12">
              <input
                id="game_id"
                name="game_id"
                type="text"
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="game_id">Game ID</label>
            </div>
            <div className="input-field col s4">
              <input
                id="info_delay"
                name="info_delay"
                type="number"
                value={formdata.info_delay}
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="info_delay">Info Delay</label>
            </div>
            <div className="input-field col s12">
              <input
                id="start_inventory"
                name="start_inventory"
                type="number"
                value={formdata.start_inventory}
                onChange={handleOnChange}
                className="validate"
              />
              <label htmlFor="start_inventory">Strting Inventory</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  name="distributer_present"
                  onChange={handleBoolOnChange}
                  checked={formdata.distributer_present}
                />
                <span>Distributer</span>
              </label>
            </div>
            <div className="input-field col s4">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  name="wholesaler_present"
                  onChange={handleBoolOnChange}
                  checked={formdata.wholesaler_present}
                />
                <span>Wholesaler</span>
              </label>
            </div>
            <div className="input-field col s4">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  name="info_share"
                  onChange={handleBoolOnChange}
                  checked={formdata.info_sharing}
                />
                <span>Info Sharing</span>
              </label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn waves-effect waves-light text-center"
              type="submit"
              name="submitbutton"
              onClick={handleSubmit}
              style={{marginTop:30}}
            >
              Create Game{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

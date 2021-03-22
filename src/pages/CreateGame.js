import React, { Component, useState, useEffect } from "react";


export default function CreateGame(){

    let defaultdata={
        session_length:"1",
        holding_cost:"1",
        backlog_cost:"1",
        demand_pattern:"1"
    }
    const [formdata,setFromData]=useState(defaultdata)

    let handleOnChange = (e) =>{

        setFromData((prevstate)=> ({
            ...prevstate,
            [e.target.name]: e.target.value
            
        }))   

    }


    let handleSubmit = (e) =>{
        e.preventDefault()
    }
    
    return(
        <div className="container">
        <h3>Create New Game </h3>

    <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s12">
          <input id="session_length" name="session_length" type="number" min={1} value={formdata.session_length} onChange={handleOnChange} className="validate" />
          <label htmlFor="session_length">Session Length</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <label>
            <input type="checkbox" className="filled-in" name="distributer_present"  onChange={handleOnChange}  />
            <span>distributer_present</span>
          </label>
        </div>
        <div className="input-field col s6">
          <label>
            <input type="checkbox" className="filled-in" name="wholesaler_present" onChange={handleOnChange}  />
            <span>wholesaler_present</span>
          </label>    
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="holding_cost" name="holding_cost" type="number" min={0} value={formdata.holding_cost} onChange={handleOnChange} className="validate" />
          <label htmlFor="holding_cost">Holding Cost</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="backlog_cost" name="backlog_cost" type="number" min={0} value={formdata.backlog_cost} onChange={handleOnChange} className="validate" />
          <label htmlFor="backlog_cost">Backlog Cost</label>
        </div>
      </div>
      <div className="row">
      <label htmlFor="demand_pattern">Demand Pattern</label>

        <div className="input-field col s12">
            <select className="browser-default" id="demand_pattern" onChange={handleOnChange} value={formdata.demand_pattern}name="demand_pattern">
              <option value disabled >Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
           
        
          </div>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="submitbutton" onClick={handleSubmit}>
                Submit  </button>
    </form>
  </div>
  </div>
  )
}



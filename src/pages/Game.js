import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
export default class PlayGameView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container mt3 ">
        <Tabs defaultActiveKey="order" id="uncontrolled-tab-example">
          <Tab eventKey="order" title="Order">
            <View1 />
          </Tab>
          <Tab eventKey="hostory" title="History">
            <View2 />
          </Tab>
          <Tab eventKey="plot" title="Plot">
            <View3 />
          </Tab>
          <Tab eventKey="info" title="OTHER INFO">
            <View4 />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function View1() {

  function handlesubmit(){
    // Handle submit here 
      var amount= document.getElementById('inpnum1')

      alert(amount.value)

  }

  return (
    <div className=" ">
      <div className="row text-center">
        <h1>For Week #1</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-5   m-3 ">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Demand From DOWNSTREAM
                <span className="badge bg-dark float-end">4</span>
              </li>
              <li className="list-group-item">
                Back Order
                <span className="badge bg-danger float-end">4</span>
              </li>
              <li className="list-group-item">
                Total Requirements
                <span className="badge bg-primary float-end">4</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-5   m-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Begining Inventory
                <span className="badge bg-dark float-end">4</span>
              </li>
              <li className="list-group-item">
                Incoming Shipment
                <span className="badge bg-success float-end">4</span>
              </li>
              <li className="list-group-item">
                Total Availiable
                <span className="badge bg-primary float-end">4</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="card col-sm-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Units Shipped to DOWNSTREAM this Week
              <span className="badge bg-success float-end">4</span>
            </li>
            <li className="list-group-item">
              Ending Inventory
              <span className="badge bg-primary float-end">4</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="row justify-content-center m-3">
        <div className="row mb-3">
          <label htmlFor="inpnum1" className="col-sm-8 col-form-label">
            Enter of number of beer to be purchased from UPSTREAM
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              name="tosend"
              className="form-control"
              id="inpnum1"
              min="1"
            />
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handlesubmit}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function View2() {
  return (
    <div className="row">
      <div className="row text-center">
        <h1>Last 10 Week Data</h1>
      </div>
      <div className="row justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">WEEK</th>
              <th scope="col">INV/BK</th>
              <th scope="col">DEMAND</th>
              <th scope="col">INCOMING</th>
              <th scope="col">OUTGOING</th>
              <th scope="col">OrderPlaced</th>
              <th scope="col">CurrentCost</th>
            </tr>
          </thead>
          <tbody>
            <DisplayTable week="1" />
            <DisplayTable week="2" />
            <DisplayTable week="3" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DisplayTable(props) {
  let week = props.week;
  // TODO: IMPLEMENT LOGIC
  return (
    <tr>
      <th scope="col">{week}</th>
      <th scope="col">1</th>
      <th scope="col">1</th>
      <th scope="col">1</th>
      <th scope="col">1</th>
      <th scope="col">1</th>
      <th scope="col">1</th>
    </tr>
  );
}

function View3() {
  return <h1>plot options to implement</h1>;
}

function View4() {
  return <h1>info view to implement</h1>;
}

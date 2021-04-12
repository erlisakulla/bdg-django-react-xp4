import {Component} from "react";

class OrderView extends Component {

    state = {
        downstream: "",
        roles: ["Factory", "Distributor", "Wholesaler", "Retailer"]
    }

    render() {
        return (
            <div className="container" style={{
                padding: 30
            }}>
                <div className="row text-center">
                    <h1>Week #1</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-5   m-3 ">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Demand From {this.props.role == "Factory"
                                        ? "Brewery"
                                        : this.state.roles[this
                                                .state
                                                .roles
                                                .indexOf(this.props.role) - 1]
}
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
                                Units Shipped to {this.props.role == "Factory"
                                    ? "Brewery "
                                    : this.state.roles[this
                                            .state
                                            .roles
                                            .indexOf(this.props.role) - 1] + " "
}
                                this Week
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
                            Enter of number of beer to be purchased from {this.props.role == "Retailer"
                                ? "Consumer"
                                : this.state.roles[this
                                        .state
                                        .roles
                                        .indexOf(this.props.role) + 1]
}
                        </label>
                        <div className="col-sm-2">
                            <input
                                type="number"
                                name="tosend"
                                className="form-control"
                                id="inpnum1"
                                min="1"/>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                SEND
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderView;
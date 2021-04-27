import {Component} from "react";
import {Form, Button} from 'react-bootstrap';
import axiosInstance from "../../../axios";

/*
    Componenet which will display the general information regarding the currnt
    week of the game. Also it provides the user the option to send the amount 
    of items required.
*/
class OrderView extends Component {
    constructor(props) {
        super(props);

        this.submitOrder = this.submitOrder.bind(this);
        this.onOrderChange = this.onOrderChange.bind(this);

        this.state ={
            order_amount: '',
        }
    }
    
    submitOrder = (e) => {
        e.preventDefault();
        axiosInstance.post(`game/role/${this.props.role_id}/postorder/`, {quantity: this.state.order_amount})
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Successfully ordered " + this.state.order_amount + " beers!");
                window.location = `/role/${this.props.role_id}`;
            }
        })
        .catch(error => {
            if(error.response){ 
                alert("Couldn't submit order.");
                console.log(error.response.data);
            }
        });
      }

    onOrderChange = (e) => {
        this.setState({order_amount: e.target.value});
        console.log(this.state.order_amount)
    }

    render() {
        return (
            <div className="container" style={{
                padding: 30
            }}>
                <div className="row text-center">
                    <h1>Week #{this.props.current_week.week_num}</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-5   m-3 ">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Demand From {this.props.current_week.downstream}
                                    <span className="badge bg-dark float-end" style={{color:'white'}}>{this.props.current_week.demand}</span>
                                </li>
                                <li className="list-group-item">
                                    Backorder
                                    <span className="badge bg-danger float-end" style={{color:'white'}}>{this.props.current_week.backorder}</span>
                                </li>
                                <li className="list-group-item">
                                    Total Requirements
                                    <span className="badge bg-primary float-end" style={{color:'white'}}>{this.props.current_week.total_requirements}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-5   m-3">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Begining Inventory
                                    <span className="badge bg-dark float-end" style={{color:'white'}}>{this.props.current_week.beginning_inventory}</span>
                                </li>
                                <li className="list-group-item">
                                    Incoming Shipment
                                    <span className="badge bg-success float-end" style={{color:'white'}}>{this.props.current_week.incoming_shipment}</span>
                                </li>
                                <li className="list-group-item">
                                    Total Availiable
                                    <span className="badge bg-primary float-end" style={{color:'white'}}>{this.props.current_week.total_available}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="card col-sm-8">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                Units Shipped to {this.props.current_week.upstream} this Week
                                <span className="badge bg-success float-end" style={{color:'white'}}>{this.props.current_week.outgoing_shipment}</span>
                            </li>
                            <li className="list-group-item">
                                Ending Inventory
                                <span className="badge bg-primary float-end" style={{color:'white'}}>{this.props.current_week.ending_inventory}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center m-3">
                    <div className="row mb-3">
                        <label htmlFor="inpnum1" className="col-sm-8 col-form-label">
                            Enter of number of beer to be purchased from {this.props.current_week.upstream}
                        </label>
                        
                        <div className="col-sm-2">
                            <Form.Control 
                                type="number" 
                                name="order" 
                                id="inpnum1"
                                value={this.state.order_amount}
                                onChange={this.onOrderChange}
                            />
                        </div>
                        <div className="col-sm-2">
                            <Button variant="primary" type="submit" onClick={this.submitOrder}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderView;
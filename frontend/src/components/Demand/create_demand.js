import {Component} from "react";
import axiosInstance from "../../axios";
import {Link} from "react-router-dom";

/*
    Component which is used by instructor to create
    and view the created demand patterns.

*/
class CreateDemand extends Component {

    state = {
        demand_list: [],
        demand_id: '',
        weeks_num: 26,
        demands: '',
		errors: {}
    }

    componentDidMount() {
        axiosInstance
            .get("game/demand")
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.setState({demand_list: res.data});

                }
            });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
	validate = () => {
		let errors = {}
		console.log(this.state.demands.split(' ').length)
		console.log(this.state.weeks_num)
		if (!this.state.demands || !this.state.demand_id || !this.state.weeks_num) {
			errors["demand"] = "Empty fields are not allowed"
			this.setState({ errors: errors });
			
			return false;
		}

		else if (this.state.demands.split(' ').length != this.state.weeks_num) {
			//this.setState({ error: "Demand length must be equal to the number of weeks" });
			errors["demand"] = "Demand length must be equal to the number of weeks"
			this.setState({ errors: errors });
			return false;
		}
		for (let i = 0; i < this.state.demands.length; ++i) {
			if (isNaN(this.state.demands[i])) {
				//this.setState({ error: "Only numbers are allowed" });
				errors["demand"] = "Demand can only be input as a number"
				this.setState({errors: errors});
				return false;
			}
		}
	
			return true;
	}

	
    onDemandChange = event => {
        const demand = event
            .target
            .value
            .split(' ');

		let check = true;
		let errors = {};
		
        if (demand.length === this.state.weeks_num) {
            for (let i = 0; i < demand.length; ++i) {
                if (isNaN(demand[i])) {
					//this.setState({ error: "Only numbers are allowed" });
					errors["demand"] = "Demand can only be input as a number"
                    this.setState({errors: errors});
                    check = false;
                    break;
                }
            }
        }
		if (check) {

            this.setState({errors: errors, demands: event.target.value});
        }

	}

	onDemandCreate = () => {
		let errorsArr = {};
		


        if (this.validate()) {
            axiosInstance
                .post("game/demand", {
                demand_id: this.state.demand_id,
                weeks_num: this.state.weeks_num,
                demands: this.state.demands
            })
                .then(res => {
					if (res.status == 201) {
						errorsArr["demand"] ="Demand Pattern was created successfully"
                        this.setState({errors: errorsArr });
                        window.location="/createdemand";
                    }
                })
				.catch(err => {
					
					errorsArr["demand_id"] = err.response.data.demand_id
					errorsArr["demand"] = err.response.data.demands

					this.setState({ errors: errorsArr });


                });
        }
    }

    render() {
        return (
            <div
                className="container"
                style={{
                paddingTop: 60
            }}>
                <div className="row">
                    <div className="col sm-6">
                        <h4 className="text-center">Create Demand Pattern</h4>
                        <div
                            className="container w-50"
                            style={{
                            paddingTop: 50
                        }}>
                            <form method="POST">
                                <div className="row">
                                    <input type="text" name="demand_id" onChange={this.onChange}></input>
									<label>Enter the demand ID</label>
									<div className="text-danger">{this.state.errors.demand_id}</div>

                                </div>
                                <div className="row">
                                    <input type="number" name="weeks_num" onChange={this.onChange} placeholder = "ex. 4"></input>
									<label>Enter the number of weeks</label>

                                </div>
                                <div className="row">
                                    <input type="text" name="demands" onChange={this.onDemandChange} placeholder="ex. 1 2 3 4"></input>
									<label>Enter the demand</label>
									<div className="text-danger">{this.state.errors.demand}</div>

                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={this.onDemandCreate}>Create</button>

                                    <Link to="/instructor">
                                        <button
                                            className="btn waves-effect waves-light text-center"
                                            name="cancelbtn"
                                            style={{
                                                marginLeft: 15
                                            }}>
                                                Cancel
                                        </button>
                                    </Link>
                                </div>
                            </form>
                            {this.state.error}
                        </div>
                    </div>

                    <div className="col sm-6">
                        <h4 className="text-center">Demand Patterns</h4>
                        <div
                            className="container w-100"
                            style={{
                                paddingTop: 50
                            }}>
                            <table className="table table-stripped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Demand ID</th>
                                        <th scope="col">Number of weeks</th>
                                        <th scope="col">Demand Pattern</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {this
                                        .state
                                        .demand_list
                                        .map((demand, index) => {
                                            return (
                                                <tr key={demand.demand_id}>
                                                    <td>{index + 1}</td>
                                                    <td>{demand.demand_id}</td>
                                                    <td>{demand.weeks_num}</td>
                                                    <td>{demand.demands}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateDemand;

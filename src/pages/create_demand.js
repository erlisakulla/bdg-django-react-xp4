import { Component } from "react";
import axiosInstance from "../axios";

class CreateDemand extends Component {

    state = {
        demand_list : [],
        demand_id: '',
        weeks_num: 26,
        demands: '',
        error: ''
    }

    componentDidMount(){
        axiosInstance.get("game/demand")
        .then(
            res => {
                if (res.status == 200) {
                    console.log(res.data);
                    this.setState({demand_list : res.data});
                }
            }
        );
    }

    onChange = event => {
        this.setState({[event.target.name] : event.target.value});
    }

    onDemandChange = event => {
        const demand = event.target.value.split(' ');
        
        let check = true;

        if (demand.length == this.state.weeks_num) {
            for (let i = 0; i < demand.length; ++i) {
                if (isNaN(demand[i])) {
                    this.setState({error : "Only numbers are allowed"});
                    check = false;
                    break;
                }
            }

        } else {
            this.setState({error : "Demand must be equal to the number of weeks"});
        }
        

        if (check) {
            this.setState({error: "", demands : event.target.value});
        }
        
    }

    onDemandCreate = () => {
        axiosInstance.post("game/demand", {
            demand_id: this.state.demand_id,
            weeks_num: this.state.weeks_num,
            demands: this.state.demands,
        })
        .then(
            res => {
                if (res.status == 201) {
                    this.setState({error : "Demand Pattern was created successfully"});
                }
            }
        ).catch(
            err => {
                this.setState({error : "Something went wrong or you are not an instructor"});
            }
        )
    }

    render() {
        return (
            <div className="container" style={{paddingTop:60}}>
                <div className="row">
                    <div className="col sm-6">
                        <h4 className="text-center">Crete Game</h4>
                        <div className="container w-50" style={{paddingTop:50}}>
                            <form method="POST">
                                <div className="row">
                                <input type="text" name="demand_id" onChange={this.onChange}></input>
                                <label>Enter the demand ID</label>
                                </div>
                                <div className="row">
                                    <input type="number" name="weeks_num" onChange={this.onChange}></input>
                                    <label>Enter the number of weeks</label>
                                </div>
                                <div className="row">
                                    <input type="text" name="demands" onChange={this.onDemandChange}></input>
                                    <label>Enter the demand</label>
                                </div>
                                <div className="row">
                                    <button type="button" className="btn btn-primary" onClick={this.onDemandCreate}>Create</button>
                                </div>
                            </form>
                            {this.state.error}
                        </div>
                    </div>

                    <div className="col sm-6">
                    <h4 className="text-center">Demand Patterns</h4>
                        <div className="container w-100" style={{paddingTop:50}}>
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
                                    {
                                        this.state.demand_list.map(
                                            (demand, index) => {
                                                return (<tr>
                                                    <td>{index + 1}</td>
                                                    <td>{demand.demand_id}</td>
                                                    <td>{demand.weeks_num}</td>
                                                    <td>{demand.demands}</td>
                                                </tr>);
                                            }
                                        )
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
import {Component} from "react";
import axiosInstance from "../../axios";
import {Link} from "react-router-dom";

/*
    Componenet which allows the instructor to create and edit the created games.
*/

class EditGame extends Component {

    state = {
        demand_list: [],
        game_data: '',
    }

    componentDidMount() {
        axiosInstance
            .get("game/demand")
            .then(res => {
                if (res.status === 200) {
                    this.setState({demand_list: res.data});
                }
            }
        );
            
        axiosInstance
            .get("game/" + this.props.match.params.id + "/")
            .then((res) => {
                this.setState({game_data: res.data})
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                }
                console.log(err)
            }
        );
    }

    handleOnChange = event => {
        this.setState({
            [event.target.name]: Number(event.target.value)
        });
    }

    handleBoolOnChange = event => {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        });
    }

    handleOnDemandChange = event => {
        this.setState({demand_id: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const formdata = {
            session_length: this.state.session_length,
            game_id: this.state.game_id,
            info_delay: this.state.info_delay,
            starting_inventory: this.state.starting_inventory,
            holding_cost: this.state.holding_cost,
            backlog_cost: this.state.backlog_cost,
            wholesaler_present: this.state.wholesaler_present,
            info_sharing: this.info_sharing,
            distributor_present: this.state.distributor_present,
            demand: this.state.demand_id
        };

        if (this.props.match.params.id != null) {
            axiosInstance
                .patch("game/" + this.props.match.params.id + "/", formdata, {crossDomain: true})
                .then((res) => {

                    if (res.status === 200) {
                        alert("Successfully Editted Game");
                        window.location = "/instructor/";
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data);
                    }
                    console.log(err)
                });
        } else {
            axiosInstance
                .post(this.state.post, formdata, {crossDomain: true})
                .then((res) => {

                    if (res.status === 201) {
                        alert("Successfully Created Game");
                        window.location = "instructor/";
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data);
                    }
                    console.log(err)
                });
        }
    }

    render() {

        return (
            <div
                className="container w-50"
                style={{
                    paddingTop: 30
                }}>
                <h3 className="text-center">Edit Game</h3>
                <div
                    className="row"
                    style={{
                        paddingTop: 30
                    }}>
                    <form className="col s12">
                        <div className="row">
                            <div className="col s6">
                                <input
                                    id="session_length"
                                    name="session_length"
                                    type="number"
                                    min={1}
                                    defaultValue={this.state.game_data.session_length}
                                    onChange={this.handleOnChange}
                                    />
                                <label>Session Length</label>
                            </div>
                            <div className="col s6">

                                <select
                                    className='form-control'
                                    name='demand_id'
                                    onChange={this.handleOnDemandChange}
                                    defaultValue={this.state.game_data.demand}>
                                    <option value="none" disabled>
                                        Choose your demand
                                    </option>
                                    {this
                                        .state
                                        .demand_list
                                        .map(demand => {
                                            return (
                                                <option key={demand.demand_id} value={demand.demand_id}>{demand.demand_id} - {demand.weeks_num} weeks</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s6">
                                <input
                                    id="holding_cost"
                                    name="holding_cost"
                                    type="number"
                                    min={0}
                                    defaultValue={this.state.game_data.holding_cost}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="holding_cost">Holding Cost</label>
                            </div>
                            <div className="col s6">
                                <input
                                    id="backlog_cost"
                                    name="backlog_cost"
                                    type="number"
                                    min={0}
                                    defaultValue={this.state.game_data.backlog_cost}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="backlog_cost">Backlog Cost</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <input
                                    id="game_id"
                                    name="game_id"
                                    type="text"
                                    onChange={this.handleOnChange}
                                    className="validate"
                                    defaultValue={this.props.match.params.id}
                                    disabled={true}/>
                                <label htmlFor="game_id">Game ID</label>
                            </div>
                            <div className="col s4">
                                <input
                                    id="info_delay"
                                    name="info_delay"
                                    type="number"
                                    defaultValue={this.state.game_data.info_delay}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="info_delay">Info Delay</label>
                            </div>
                            <div className="col s12">
                                <input
                                    id="starting_inventory"
                                    name="starting_inventory"
                                    type="number"
                                    defaultValue={this.state.game_data.starting_inventory}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="starting_inventory">Starting Inventory</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="distributor_present"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.game_data.distributor_present}
                                        disabled
                                    />
                                    <span>Distributor</span>
                                </label>
                            </div>
                            <div className="col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="wholesaler_present"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.game_data.wholesaler_present}
                                        disabled
                                    />
                                    <span>Wholesaler</span>
                                </label>
                            </div>
                            <div className="col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="info_sharing"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.game_data.info_sharing}
                                        disabled
                                    />
                                    <span>Info Sharing</span>
                                </label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button
                                className="btn btn-primary waves-effect waves-light text-center"
                                type="submit"
                                name="submitbutton"
                                onClick={this.handleSubmit}
                                style={{
                                    marginTop: 30
                                }}>Update Game
                            </button>
                            
                            <Link to="/instructor">
                                <button
                                    className="btn waves-effect waves-light text-center"
                                    name="cancelbtn"
                                    style={{
                                        marginTop: 30, marginLeft: 15

                                    }}>
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditGame;
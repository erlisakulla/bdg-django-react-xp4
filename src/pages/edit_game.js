import {Component} from "react";
import axiosInstance from "../axios";

class EditGame extends Component {

    state = {
        session_length: 1,
        game_id: '',
        info_delay: 2,
        starting_inventory: 5,
        holding_cost: 1,
        backlog_cost: 1,
        wholesaler_present: true,
        info_sharing: true,
        distributer_present: true,
        demand_id: '',
        demand_list: [],
        post: ''
    }

    componentDidMount() {
        axiosInstance
            .get("game/demand")
            .then(res => {
                if (res.status == 200) {
                    this.setState({demand_list: res.data});
                }
            });

        if (this.props.match.params.id == null) {
            this.setState({post: "game/"});
        } else {
            this.setState({
                post: "game/edit/" + this.props.match.params.id + "/"
            });
            this.setState({game_id: this.props.match.params.id});
        }

        console.log(this.props.match.params.id);
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
            distributer_present: this.state.distributer_present,
            demand_id: this.state.demand_id
        };

        if (this.props.match.params.id != null) {
            axiosInstance
                .put(this.state.post, formdata, {crossDomain: true})
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
                <h3 className="text-center">{this.state.post == "game/"
                        ? "Create Game"
                        : "Edit Game"}</h3>
                <div
                    className="row"
                    style={{
                    paddingTop: 30
                }}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="session_length"
                                    name="session_length"
                                    type="number"
                                    min={1}
                                    value={this.state.session_length}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="session_length">Session Length</label>
                            </div>
                            <div className="input-field col s6">

                                <select
                                    className='form-control'
                                    name='demand_id'
                                    onChange={this.handleOnDemandChange}>
                                    <option defaultValue disabled>
                                        Choose your role
                                    </option>
                                    {this
                                        .state
                                        .demand_list
                                        .map(demand => {
                                            return (
                                                <option value={demand.demand_id}>{demand.demand_id}</option>
                                            );
                                        })
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
                                    value={this.state.holding_cost}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="holding_cost">Holding Cost</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="backlog_cost"
                                    name="backlog_cost"
                                    type="number"
                                    min={0}
                                    value={this.state.backlog_cost}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="backlog_cost">Backlog Cost</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="game_id"
                                    name="game_id"
                                    type="text"
                                    onChange={this.handleOnChange}
                                    className="validate"
                                    disabled=
                                    {this.state.post == "game/edit/" + this.props.match.params.id + "/"}/>
                                <label htmlFor="game_id">Game ID</label>
                            </div>
                            <div className="input-field col s4">
                                <input
                                    id="info_delay"
                                    name="info_delay"
                                    type="number"
                                    value={this.state.info_delay}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="info_delay">Info Delay</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    id="starting_inventory"
                                    name="starting_inventory"
                                    type="number"
                                    value={this.state.starting_inventory}
                                    onChange={this.handleOnChange}
                                    className="validate"/>
                                <label htmlFor="starting_inventory">Strting Inventory</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="distributer_present"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.distributer_present}/>
                                    <span>Distributer</span>
                                </label>
                            </div>
                            <div className="input-field col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="wholesaler_present"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.wholesaler_present}/>
                                    <span>Wholesaler</span>
                                </label>
                            </div>
                            <div className="input-field col s4">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="filled-in"
                                        name="info_sharing"
                                        onChange={this.handleBoolOnChange}
                                        checked={this.state.info_sharing}/>
                                    <span>Info Sharing</span>
                                </label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button
                                className="btn waves-effect waves-light text-center"
                                type="submit"
                                name="submitbutton"
                                onClick={this.handleSubmit}
                                style={{
                                marginTop: 30
                            }}>
                                {this.state.post == "game/"
                                    ? "Create Game"
                                    : "Edit Game"}{" "}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditGame;
import { Component } from "react";
import axiosInstance from "../../../axios";

class SelectRole extends Component {

    state = {
        role : '',
        error : '',
        game_id : ''
    }

    componentDidMount() {
        console.log(typeof(this.props.game.game_id));
        this.setState({game_id : this.props.game.game_id});
    }

    handleRoleChange = event => {
        this.setState({[event.target.name] : event.target.value});
    }

    handleEnterGame = event => {
        console.log(typeof(this.state.role))
        const data = {
            role : this.state.role,
            game_id : this.state.game_id
        };
        console.log(data);
        axiosInstance.get("game/entergame", {
            params : data
        })
        .then(
            res => {
                if (res.data.length != 0) {
                    this.setState({error : "This role is already taken"});
                } else {
                    axiosInstance.post("game/entergame/", data)
                    .then(
                        res => {
                            if (res.status == 201) {
                                window.location = '/play/' + this.state.game_id;
                            }
                        }
                    );
                }
            }
        );
    }


    render() {

        return (
            <div className="container">
                <h6>Choose your role for game : {this.state.game_id} </h6>
                <div className="input-field ">
                    <select className="browser-default" name="role" onChange={this.handleRoleChange}>
                        <option defaultValue disabled>
                            Choose your role
                        </option>
                        <option value="Factory">Factory</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Retailer">Retailer</option>
                    </select>
                </div>
  
                <div className="input-field">
                    <button className="btn" onClick={this.handleEnterGame}>
                        Enter Game
                    </button>
                </div>

                <div>
                    {this.state.error}
                </div>
            </div>
        );
    }


}

export default SelectRole;
import {Component} from "react";
import axiosInstance from "../../axios";
import SelectRole from "./subComponents/select_role";
import CurrentGame from "./subComponents/current_games";

/*
    Component whcih allows players to join a game and to continue their previos
    games.
*/
class Player extends Component {

    state = {
        user_info: '',
        game_data: '',
        games: [],
        game_id: '',
        error: '',
        select_role: false
    }

    componentDidMount() {
        axiosInstance.get("user/info/")
            .then((res) => {
                console.log(res.data);
                if (res.data.isAdmin === true) {
                    window.location = '/instructor';
                }
                else {
                    axiosInstance
                        .get("user/info/")
                        .then(res => {
                            this.setState({user_info: res.data.email});
                        })
                        .catch((err) => {
                            if (err.response) {
                                this.setState({error: err.response.data});
                            }
                        });

                    axiosInstance
                        .get("game/entergame/")
                        .then(res => {
                            this.setState({games: res.data});
                        }
                    );
                }
            }
        ); 
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleJoin = event => {
        axiosInstance
            .get("/game/" + this.state.game_id)
            .then(res => {
                this.setState({game_data: res.data, error: '', select_role: true});
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        error: JSON.stringify(error.response.data.detail),
                        select_role: true
                    });
                }
            })
    }

    render() {
        return (
            <div className="container">

                <h3>Hello {this.state.user_info}</h3>

                <div
                    className="row"
                    style={{
                    marginTop: 60
                }}>

                    <div className="col sm-6">
                        <div className="container w-50">
                            <p>Enter Code to Join Game</p>
                            <div className="input-field">
                                <input
                                    name="game_id"
                                    id="game_id"
                                    type="text"
                                    onChange={this.handleChange}
                                    className="validate"/>
                                <label className="active" htmlFor="gamecode">
                                    Game Code
                                </label>
                            </div>
                            <div className="input-field">
                                <button className="btn" onClick={this.handleJoin}>
                                    Join
                                </button>
                            </div>
                            <div
                                className="row"
                                style={{
                                marginTop: 20
                            }}>
                                {this.state.error}
                                {this.state.select_role
                                    ? <SelectRole game={this.state.game_data}/>
                                    : null}
                            </div>

                        </div>

                    </div>

                    <div className="col sm-6">
                        <div>
                            <h1>Current Games</h1>
                            {this
                                .state
                                .games
                                .map(game => {
                                    return <CurrentGame game={game}/>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
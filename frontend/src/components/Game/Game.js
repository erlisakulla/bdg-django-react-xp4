import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";
import OrderView from "./subComponents/order_view";
import InfoView from "./subComponents/info_view";
import PlotView from "./subComponents/plot_view";
import StatusView from "./subComponents/status_view";
import axiosInstance from "../../axios";

/*
    Component which contains the 4 scrrens of the game and retrieves data from
    database for the current player.
*/
class PlayGameView extends Component {

    state = {
        role: '',
        shared_info: '',
        all_weeks: [],
        current_week: '',
        next_round_status: false,
    }

    componentDidMount() {
        axiosInstance
            .get("game/role/" + this.props.match.params.id)
            .then(res => {
                this.setState({role: res.data});
                console.log(res.data);

                axiosInstance
                    .get("game/role/" + this.props.match.params.id + "/getsharedinfo/")
                    .then(res => {
                        this.setState({shared_info: res.data});
                        console.log(res.data);
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data);
                        }
                    }
                );

                axiosInstance
                    .get("game/" + this.state.role.game_id + "/getallweeks/")
                    .then(res => {
                        this.setState({all_weeks: res.data});
                        console.log(res.data);
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data);
                        }
                    }
                );

                axiosInstance
                    .get("game/role/" + this.props.match.params.id + "/getcurrentweek/")
                    .then(res => {
                        this.setState({current_week: res.data});
                        console.log(res.data);
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data);
                        }
                    }
                );

                axiosInstance
                    .get("game/role/" + this.props.match.params.id + "/nextroundstatus/")
                    .then(res => {
                        this.setState({next_round_status: res.data});
                        console.log(res.data);
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.response.data);
                        }
                    }
                );
            })
            .catch((err) => {
                if (err.response) {
                   console.log(err.response.data);
                }
            }
        );
    }

    render() {
        return (
            <div className="container mt3 ">
                <Tabs defaultActiveKey="order" id="uncontrolled-tab-example">
                    <Tab eventKey="order" title="Order">
                        <OrderView current_week={this.state.current_week} role_id={this.state.role.id}/>
                    </Tab>
                    <Tab eventKey="hostory" title="Weeks Info">
                        <InfoView all_weeks={this.state.all_weeks}/>
                    </Tab>
                    <Tab eventKey="plot" title="Plot">
                        <PlotView/>
                    </Tab>
                    <Tab eventKey="status" title="Status">
                        <StatusView shared_info={this.state.shared_info}/>
                    </Tab>
                </Tabs>

                <a href="/player">Back to Games</a>
            </div>
        );
    }
}

export default PlayGameView;
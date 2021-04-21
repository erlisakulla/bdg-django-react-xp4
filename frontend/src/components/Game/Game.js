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
        game_id: '',
        weeks: []
    }

    componentDidMount() {
        console.log(this.props.location.state);
        this.setState({role:this.props.location.state});
        axiosInstance
            .get("game/play/" + this.props.match.params.id, {
                params : {
                    game_id : this.props.match.params.id
                }
            })
            .then(res => {
                this.setState({weeks:res.data});
            })
            .catch((err) => {
                if (err.response) {
                   
                }
            });
    }

    render() {
        return (
            <div className="container mt3 ">
                <Tabs defaultActiveKey="order" id="uncontrolled-tab-example">
                    <Tab eventKey="order" title="Order">
                        <OrderView role={this.state.role}/>
                    </Tab>
                    <Tab eventKey="hostory" title="History">
                        <InfoView data={this.state.weeks}/>
                    </Tab>
                    <Tab eventKey="plot" title="Plot">
                        <PlotView/>
                    </Tab>
                    <Tab eventKey="status" title="Status">
                        <StatusView/>
                    </Tab>
                </Tabs>

                <a href="/player">Back to Games</a>
            </div>
        );
    }
}

export default PlayGameView;
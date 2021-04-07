import { Component } from "react";
import axiosInstance from "../axios";


/* 
    UI need to be done after the service of getting other infor for the
    game is done.
*/
class GameDetails extends Component {

    state = {
        game : ""
    }

    componentDidMount() {
        axiosInstance.get("game/" + this.props.match.params.id)
        .then(
            res => {
                this.setState({game : JSON.stringify(res.data)});
            }
        );
    }

    render() {

        return (
            <div>
                {this.state.game}
            </div>
        );
    }
}

export default GameDetails;
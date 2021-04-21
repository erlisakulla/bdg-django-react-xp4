import {Link} from "react-router-dom";

function CurrentGame(props) {
    return (
        <div style={{
            padding: 15
        }}>
            Game : {props.game.game_id}
            <br/>
            Role : {props.game.role}
            <br/>
            <Link
                to={{
                pathname: "/play/" + props.game.game_id,
                state: props.game.role
            }}>Continue</Link>
        </div>
    );
}

export default CurrentGame;
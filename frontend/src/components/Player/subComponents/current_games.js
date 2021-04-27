import {Link} from "react-router-dom";

/*
    List of games player is registered for.
*/
function CurrentGame(props) {
    return (
        <div style={{
            padding: 15
        }}>
            Game : {props.role.game_id}
            <br/>
            Role : {props.role.role_name}
            <br/>
            <Link
                to={{
                pathname: "/role/" + props.role.id,
                state: props.role.id
            }}>Enter Game</Link>
        </div>
    );
}

export default CurrentGame;
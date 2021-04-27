import { Component } from "react";
import axiosInstance from "../../../axios";

class SelectRole extends Component {

    state = {
        role : '',
        error : '',
        game_id : '',

        role_register: {
            user_id: '',
        }
    }

    handleRoleChange = event => {
        this.setState({[event.target.name] : event.target.value});
        this.setState({errors: null});
    }

    handleEnterGame = event => {
        const data = {
            role : this.state.role,
            game_id : this.state.game_id
        };
        console.log(data);

        axiosInstance.patch(`game/role/${this.state.role}/roleregister/`)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Registered successfully");
                window.location = "/player";
            } 
            else {
                console.log(res.data);
            }
        })
        .catch(error => {if(error.response){ 
            const errorMessage = "Couldn't register to game. Don't register for the same game. Please try again.";
            this.setState({errors: errorMessage});
            console.log(error.response.data);
        }});
    }

    render() {
        return (
            <div className="container">
                <h6>Choose your role for game : {this.props.game_id} </h6>
                <div className="input-field ">
                    <select className="browser-default" name="role" onChange={this.handleRoleChange} defaultValue={"none"}>
                        <option value="none" disabled>Select Role</option>
                        <RolesList roles={this.props.roles}/>
                    </select>
                </div>
  
                <div className="input-field">
                    <button className="btn" onClick={this.handleEnterGame}>
                        Register to Game
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

const RolesList = (props) => {
	const { roles } = props;

	if (!roles || roles.length === 0) {
		return ( 
			<option value="none" disabled>No roles to display</option>
		);
	}
  let counter = 0;
  return (
    <>
      {roles.map((role) => {
        return(
          <option key={counter++} value={role.id}>{role.role_name}</option>
        );
      })}
    </>
	)
}
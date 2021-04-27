import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style/SignIn.css";
import axiosInstance from "../../axios";

/*
    Component which allows the user to login.
*/

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
			errors: {}
        };
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
	};
	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	  };

	  handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	  };
	//validation
	validate = () => {
		let errors = {};
		let isValid = true;


		if (!this.state.email) {
			isValid = false;
			errors["email"] = "Please enter your email Address.";
		}

		//password length check
		if (!this.state.password) {
			isValid = false;
			errors["password"] = "Please enter your Password";
		}

		if (typeof this.state.email !== "undefined") {

			const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(this.state.email)) {
			isValid = false;
			errors["email"] = "Please enter a valid email address.";
			}
		}

		this.setState({
			errors: errors
			// email: errors["email"],
			// password: errors["password"]
		});

		return isValid;
	  }


	sendForm = (e) => {
		e.preventDefault();

		if (this.validate()) {
			axiosInstance
				.post("api/token/", {
					email: this.state.email,
					password: this.state.password
				})
				.then((res) => {
					localStorage.setItem('access_token', res.data.access)
					localStorage.setItem('refresh_token', res.data.refresh)
					axiosInstance.defaults.headers['Authorization'] = 'JWT' + localStorage.getItem('access_token');
					window.location = '/';
				})
			.catch((err) => {
				if (err.response) {
					//if(err.response ===)
					console.log(err.response.data.detail)
					let errors = {}
					errors["password"] = err.response.data.detail
					this.setState({
						errors: errors
					})
				}
			});
		}
    }

    render() {
        return (
            <div>
                <section className="content-wrapper" style={{textAlign:'center'}}>
                    <div className="login">
                        <div className="box">
                            <form id="userCredentials" className="loginbox">
								<h2>LOGIN</h2>
								<div className="mb-3">

                                <label htmlFor="username">Email</label>
								<input id="username" name="email" type="text" onChange={this.handleEmailChange} />
									<div className="text-danger">{this.state.errors.email}</div>
								</div>
								<div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}/>
									<div className="text-danger">{this.state.errors.password}</div>
									</div>
                                <div className="buttonContainer">
                                    <button id="userSubmit" onClick={this.sendForm}>
                                        Log in
                                    </button>
                                </div>
                                <small className="form-text">
                                    Not
                                    <Link to="signup"> Signed Up </Link>
                                    yet?
                                </small>
                            </form>
                        </div>
                    </div>
                    <div style={{marginTop:'20px', color:'red'}}>{this.state.error}</div>
                </section>
            </div>
        );
    }
}

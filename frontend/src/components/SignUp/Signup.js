import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../Login/style/SignIn.css";
import axiosInstance from "../../axios"

/** Component which allows the users to sign up as a student(player) or instructor */
export default class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
			password: "",
			password1: "",
            error: "",
            isinstructor: false,
			message: "",
			errors: {}
        };
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onChangePlayerOrInstructor = (e) => {
        if (e.target.value === "instructor") {
            this.setState({isinstructor: true});
        } 
        else {
            this.setState({isinstructor: false});
        }
    };

	validate = () => {
		let errors = {};
		let isValid = true;
		
		if (this.state.name.length === 0) {
			isValid = false;
			errors["name"] = "Please enter your username.";
		}
	
		if (!this.state.email) {
			isValid = false;
			errors["email"] = "Please enter your email Address.";
		}
	
		//password length check 
		if (!this.state.password) {
			isValid = false;
			errors["password"] = "Please enter your Password";
		}
		if (!this.state.password1) {
			isValid = false;
			errors["password1"] = "Please enter your Password";
		} else if (this.state.password !== this.state.password1) {
			isValid = false;
			errors["password1"] = "The passwords did not match";
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
		});
	
		return isValid;
	};
	
    sendForm = (e) => {
        e.preventDefault();

       
		if (this.validate()) {
			let errors = {};
			axiosInstance.post('user/create/', {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				is_instructor: this.state.isinstructor
			}, { crossDomain: true }).then((res) => {
                errors["password1"] = 'Created succesfully';
                this.setState({
                    errors: errors
                })
                console.log("created sucessfully")
                window.location = '/login';
			}).catch((err) => {
				errors["password1"] = "Invalid credentials - email already used";
				if (err.response) {
					this.setState({
						errors: errors
					})
				}
			})
		}
      
    };

    render() {
        return (
            <div>
                <section className="content-wrapper">
                    <div className="signup">
                        <div>{this.state.message}</div>
                        <div>{this.state.error}</div>
                        <div className="box">
                            <form id="userCredentials" className="loginbox">
                                <h2>SIGN UP</h2>
                                <div className="input-field col s6">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={this.state.identifier}
                                        onChange={this.onChange}
                                        required/>
                                    <label htmlFor="name">Name</label>
									<div className="text-danger">{this.state.errors.name}</div>
                                </div>
                                <div className="input-field col s6">

                                    <label htmlFor="name">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={this.state.identifier}
                                        onChange={this.onChange}
										required />
								<div className="text-danger">{this.state.errors.email}</div>
                                </div>
                                <div className="input-field col s6">

                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={this.state.identifier}
                                        onChange={this.onChange}
                                        required/>
									<label htmlFor="password">Password</label>
									<div className="text-danger">{this.state.errors.password}</div>
								</div>
								<div className="input-field col s6">

                                    <input
                                        type="password"
                                        id="password1"
                                        name="password1"
                                        value={this.state.identifier}
                                        onChange={this.onChange}
                                        required/>
									<label htmlFor="password">Password again</label>
									<div className="text-danger">{this.state.errors.password1}</div>
                                </div>
                                <div className=" col s6">

                                    <label htmlFor="playerOrInstructor">
                                        Are you an instructor or student?{" "}
                                    </label>
                                    <select
                                        className="browser-default"
                                        name="playerOrInstructor"
                                        defaultValue
                                        id="playerOrInstructor"
                                        onChange={this.onChangePlayerOrInstructor}>
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                    </select>
                                </div>
                                <div className="buttonContainer">
                                    <button id="userSubmit" onClick={this.sendForm}>
                                        Sign Up
                                    </button>
                                </div>
                                <small className="form-text">
                                    Already Sign Up? Go to
                                    <Link to=""> Log In</Link>.
                                </small>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

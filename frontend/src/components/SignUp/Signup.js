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
            error: "",
            isinstructor: false,
            message: ""
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

    sendForm = (e) => {
        e.preventDefault();

        if (this.state.email === "" || this.state.email === "" || this.state.email === "") {
          this.setState({error : "All fields are required"});
        } 

        axiosInstance.post('user/create/', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            is_instructor: this.state.isinstructor
        }, {crossDomain: true}).then((res) => {
            if (res.status === 201) {
                this.setState({message: "created sucessfully"})
                this.setState({error: ""})
                window.location = "/login"
            } 
            else {
                this.setState({error: "Couldn't create account."})
            }
        }).catch((err) => {
             if (err.response) {
                this.setState({
                    error: err.response.data.datails
                })
            }
        })
      
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

                                </div>
                                <div className="input-field col s6">

                                    <label htmlFor="name">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={this.state.identifier}
                                        onChange={this.onChange}
                                        required/>
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
                                    Already Sign Up? Go to <Link to="/login"> Log In</Link>.
                                </small>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style/SignIn.css";
import axios from "axios";
import Nav from "../Nav";
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
            error: ""
        };
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    sendForm = (e) => {
        e.preventDefault();

        let route = "";

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
                    this.setState({
                        error: JSON.stringify(err.response.data)
                    })
                }
            });
    }

    render() {
        return (
            <div>
                <section className="content-wrapper">
                    <div>{this.state.error}</div>
                    <div className="login">
                        <div className="box">
                            <form id="userCredentials" className="loginbox">
                                <h2>LOGIN</h2>
                                <label htmlFor="username">Email</label>
                                <input id="username" name="email" type="text" onChange={this.onChange}/>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>

                                <div className="buttonContainer">
                                    <button id="userSubmit" onClick={this.sendForm}>
                                        Log in
                                    </button>
                                </div>
                                <small className="form-text">
                                    Not
                                    <Link to="signup">Signed Up</Link>
                                    yet?
                                </small>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

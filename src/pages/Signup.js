import React, { Component } from "react";
import { Link , useHistory } from "react-router-dom";
import "./CSS/SignIn.css";
import axios from "axios";
import axiosInstance from "../axios"
import Nav from "../components/Nav";

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      isinstructor: false,
      message:""
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onChangePlayerOrInstructor = (e) => {
    if (e.target.value === "instructor") {
      this.setState({ isinstructor: true });
    } else {
      this.setState({ isinstructor: false });
    }
  };


  sendForm = (e) => {
    e.preventDefault();

    axiosInstance.post('user/create/',
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          is_instructor: this.state.isinstructor
        },
        {
          crossDomain: true,
        }
      )
      .then((res) => {


        if (res.status === 201) {
          this.setState({message:"created sucessfully"})
          // useHistory().push("/");
                } else {
        }
      })
      .catch((err) =>{
        if(err.response){
          this.setState({error: JSON.stringify(err.response.data)})
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
                />
                                <label htmlFor="name">Name</label>

                </div>
                <div className="input-field col s6">

                <label htmlFor="name">E-Mail</label>
                <input
                  id="email"
                  name="email"
                  type="email" className="validate"
                  value={this.state.identifier}
                  onChange={this.onChange}
                />
                </div>
                <div className="input-field col s6">

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.identifier}
                  onChange={this.onChange}
                />
                <label htmlFor="password">Password</label>
      </div>
      <div className=" col s6">

                <label htmlFor="playerOrInstructor">
                  Are you an instructor or student?{" "}
                </label>
                <select  className="browser-default"
                  name="playerOrInstructor"
                  defaultValue
                  id="playerOrInstructor"
                  onChange={this.onChangePlayerOrInstructor}
                >
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
                  Already Sign Up? Go to <Link to="">Log In</Link>.
                </small>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

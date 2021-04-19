import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
// import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    // username: Joi.string().required().label("Username"),
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name")
  };

  doSubmit = async () => {
    //use try catch block to log errors
    try {
      const response = await userService.register(this.state.data);
      //after custom header has been applied for jwt, store it in localstorage
      localStorage.setItem("token", response.headers["x-auth-token"]);
      //redirect user to home
      this.props.history.push("/");
    } catch (ex) {
      //To check for exception or error obj has response
      if (ex.response && ex.response.status === 400) {
        //clone the errors object to a new obj
        const errors = { ...this.state.errors };
        //display errors coming from the sever
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    //Clear all input fields
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;

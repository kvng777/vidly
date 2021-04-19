import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      //obtain the jwt with obj destructuring
      const { data: jwt } = await login(data.username, data.password);
      //access local storage and store jwt there : key, value
      localStorage.setItem("token", jwt);
      //direct the user back to home
      window.localStorage = "/";
    } catch (ex) {
      //check if ex has a response, and if its 400
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        //get the error from the server
        errors.username = ex.response.data;
        //then pass this as new errors obj
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;

import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
// import { render } from "@testing-library/react";

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
      await auth.login(data.username, data.password);
      //pick the state property from .location
      const { state } = this.props.location;
      //if state is defined then redirects user to the custom location: pathname, otherwise to home
      window.location = state ? state.from.pathname : "/";
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
    //If user is logged in, return a redirect component to homepage...
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    console.log(auth.getCurrentUser());
    //...Otherwise, return to login form
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "admin@vidly.com")}
          {this.renderInput("password", "Password", "password", "123456")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;

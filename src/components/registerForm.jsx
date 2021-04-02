import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", firstName: "" },
    errors: {}
  };

  schema = {
    // username: Joi.string().required().label("Username"),
    username: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      }),
    password: Joi.string()
      .required()
      // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .label("Password"),
    firstName: Joi.string().required().label("Name")
  };

  doSubmit = () => {
    //call the server
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstName", "Name", "text")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;

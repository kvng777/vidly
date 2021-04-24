import { Component } from "react";
import auth from "../services/authService";

//this component removes the token of a logged in user upon log out, and rerenders the app.
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  //not rendering anything, so return null
  render() {
    return null;
  }
}

export default Logout;

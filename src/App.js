import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  //Getting the current user - START//
  state = {};

  componentDidMount() {
    try {
      //get the token
      const jwt = localStorage.getItem("token");
      //decode the token with jwt
      const user = jwtDecode(jwt);
      //then set it to new state
      this.setState({ user });
    } catch (error) {}
  }
  //Getting the current user - END//

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {/* pass user jwt content here */}
        <NavBar user={this.state.user} />
        <div className="content container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

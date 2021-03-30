import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieForm";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="content container">
        <Switch>
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
      {/* <Movies /> */}
    </React.Fragment>
  );
}

export default App;

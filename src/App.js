import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
// import Customers from "./components/customers";
// import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  //Getting the current user - START//
  state = {};
  componentDidMount() {
    //get user object
    const user = auth.getCurrentUser();
    //set it to the components state
    this.setState({ user });
  }
  //Getting the current user - END//

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        {/* pass user jwt content here */}
        <NavBar user={this.state.user} />
        <div className="content container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            {/* //to pass multiple props need to use the render method */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            {/* <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} /> */}
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

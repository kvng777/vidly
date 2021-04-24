import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

//use object destructuring to get path from props obj
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    // protect the route, if not logged in then cannot access new form
    <Route
      {...rest}
      render={(props) => {
        //if falsey redirect user to login
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        // otherwise we redirect to movieform with these props
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

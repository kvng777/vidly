import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
// import logger from "./services/logService";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";

//display the environment variables
console.log("SUPERMAN", process.env.REACT_APP_NAME);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./css/index.css";
import App from "./componentes/app";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);

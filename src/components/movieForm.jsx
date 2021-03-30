import React, { Component } from "react";
import { Link } from "react-router-dom";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie ID {match.params.id}</h1>
      <button
        onClick={() => history.push("/movies")}
        className="btn btn-primary"
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;

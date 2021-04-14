import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  //validation patterns 验证数据模块
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      //if we can get movie...
      const { data: movie } = await getMovie(movieId);
      //then set this state
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      //however if we catch an exception
      //1. check if ex has response
      //2. checl status of response is 404
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async populateGenres() {
    //apply async await, ang get data properties naming it genres
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async componentDidMount() {
    this.populateMovies();
    this.populateGenres();
  }

  //define the viewmodel of movie, so that componentDidMount can read the objects of Movies
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  //when form is submitted we call:
  doSubmit = async () => {
    //save the new state to this
    await saveMovie(this.state.data);

    //Then redirect user
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;

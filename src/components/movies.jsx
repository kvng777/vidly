import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    //with http request, apply async await to obtain data
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    //undo the changes when services fail
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    //try catch block to display relevant errors
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      //if the exception has a response, and the response is 404 then display a toast notif to user
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      //... then undo the changes to original movies
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    // let filtered set equal to allMovies
    let filtered = allMovies;
    //check if theres a searched query, then filter the query based on lowercase and with startsWith() method.
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    //if genre is selected, then we filter by selected genre
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    //extract the current user
    const user = this.props.user;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row container mt-3">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-8">
          {/* //If user is truthy and having the link */}
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Movies;

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

//this function should create or update a movie
export function saveMovie(movie) {
  //UPDATE SCENARIO//
  //check if this movie exists, if yes -> update
  if (movie._id) {
    //restful api dont like IDs in the body while request has an ID already.
    //clone the object, then delete the id
    const body = { ...movie };
    delete body._id;
    //send http put request
    return http.put(movieUrl(movie._id), body);
  }

  //CREATE SCENARIO//
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

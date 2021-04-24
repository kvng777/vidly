import http from "./httpService";
// import { apiUrl } from "../config.json";

//url of the users page
const apiEndPoint = "/users";

//export the function to register
export function register(user) {
  //create new data with HTTP post
  //Param1 - target the DB location
  //Param2 - target the user object model
  //send it to the server, and return the promise
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

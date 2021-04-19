//this service is responsible for login and logout operations
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

//function that takes an email, and password as params
export function login(email, password) {
  //create a post request
  //Post where? - apiendpoint
  //Post what? - obj with Email & Password properties
  return http.post(apiEndPoint, { email, password });
}

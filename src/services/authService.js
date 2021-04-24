//this service is responsible for login and logout operations
import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndPoint = "/auth";
const tokenKey = "token";

//get jason web token
http.setJwt(getJwt());

//login method that takes an email, and password as params
export async function login(email, password) {
  //create post request to apiendpoint, for obj email & pw properites
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  //access local storage and store jwt there : key, value
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    //get the token
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

//get tokenkey - passed to httService
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJwt
};

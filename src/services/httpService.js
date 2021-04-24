//import axios for the service
//import logger from logService for the service
//import toast from react-toastify for the notification effects
// 1. intercept the errors with axios response
// 2. expoet default of http methods: get, post, put, delete

import axios from "axios";
import logger from "./logService";
// import auth from "./authService";
import { toast } from "react-toastify";

//this distinguishes how the app is run through which env(dev or prod)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const { errorRange } = error.response;
  //define the error range of HTTP status
  const expectedError =
    errorRange && errorRange.status >= 400 && errorRange.status < 500;

  //If the theres no expectedError then log the error, taostify also notifies on client side
  if (!expectedError) {
    logger.log(error);
    toast.error("An unxepcted error occured!");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  //when making http request, need to include this header in the request - allows API authorization
  //speak to auth, to aquire token: getJwt()
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};

import axios from "axios";

const baseURL = "https://be-pengetahuan-tradisional.herokuapp.com/api/";

const Api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

export default Api;

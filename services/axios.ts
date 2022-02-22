import axios from "axios";

const url = "https://rise-rn-test-api.herokuapp.com/api/v1";

const instance = axios.create({
  baseURL: url,
});

export default instance;

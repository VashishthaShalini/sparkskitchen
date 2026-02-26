import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:9090"
});

export default publicApi;